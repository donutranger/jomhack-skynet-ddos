import openai
import time

# gets API Key from environment variable OPENAI_API_KEY
client = openai.OpenAI()

assistant = client.beta.assistants.create(
    name="Risk Engine",
    instructions="You are risk evaluation model for banks. You are given information about company and you need to evaluate the risk of the company.",
    tools=[{"type": "retrieval"}],
    model="gpt-4-1106-preview",
)

file = client.files.create(
  file=open("abnb-20211231.pdf", "rb"),
  purpose='assistants'
)

client.beta.assistants.files.create(
    assistant_id=assistant.id,
    file_id=file.id
)

thread = client.beta.threads.create()

# message = client.beta.threads.messages.create(
#     thread_id=thread.id,
#     role="user",
#     file_ids=[file.id],
#     content="""Extract company information from the attached file to valid json object that has following fields:
#     { 
#         "name" : "Company Name",
#         "address" : "Company Address",
#         "phone" : "Company Phone",
#         "email" : "Company Email",
#         "website" : "Company Website",
#         "industry" : "Company Industry",
#         "incorporation_date" : "Company Incorporation Date",
#         "origin_country" : "Company Origin Country"
#     }
#     """
# )

# client.beta.threads.messages.create(
#     thread_id=thread.id,
#     role="user",
#     file_ids=[file.id],
#     content="""Extract company financial information from the attached file  to valid json object that has following fields:

#     {
#         "revenue" : "Company Revenue",
#         "profit" : "Company Profit",
#         "assets" : "Company Assets",
#         "liabilities" : "Company Liabilities",
#         "equity" : "Company Equity",
#         "debt" : "Company Debt",
#         "cash" : "Company Cash",
#         "debt_to_equity_ratio" : "Company Debt to Equity Ratio",
#         "current_ratio" : "Company Current Ratio",
#         "quick_ratio" : "Company Quick Ratio"
#     }
#     """
# )

# client.beta.threads.messages.create(
#     thread_id=thread.id,
#     role="user",
#     file_ids=[file.id],
#     content="""You MUST provide risk evaluation for the company from 1 to 100. 1 is the highest risk and 100 is the lowest risk. based on attached file.
#     Your response MUST be in json format that has following fields:
    
#     {
#       "risk_score": "Company Risk Score (0-100)",
#       "risk_level": "Company Risk Level(Low, Medium, High)",
#       "risk_reason": "Reason for the risk level"    
#     }
#     """
# )

run = client.beta.threads.runs.create(
  thread_id=thread.id,
  assistant_id=assistant.id,
  instructions="",
)

print("checking assistant status. ")
while True:
    run = client.beta.threads.runs.retrieve(
        thread_id=thread.id,
        run_id=run.id
    )

    if run.status == "completed":
        print("done!")
        messages = client.beta.threads.messages.list(
            thread_id=thread.id
        )

        print("messages: ")
        for message in messages:
            print({
                "role": message.role,
                "message": message.content[0].text.value
            })

        client.beta.assistants.delete(assistant.id)
        
        break
    else:
        print("in progress...")
        time.sleep(5)