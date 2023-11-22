import openai
import time

# gets API Key from environment variable OPENAI_API_KEY
client = openai.OpenAI()

assistant = client.beta.assistants.create(
    name="Risk Engine",
    instructions="You are an AI trained to analyze 10-K reports",
    tools=[{"type": "retrieval"}],
    model="gpt-4-1106-preview",
)

file = client.files.create(
  file=open("NASDAQ_BKNG_2019_Part2.pdf", "rb"),
  purpose='assistants'
)

client.beta.assistants.files.create(
    assistant_id=assistant.id,
    file_id=file.id
)

thread = client.beta.threads.create()

# Part 1
# message = client.beta.threads.messages.create(
#     thread_id=thread.id,
#     role="user",
#     file_ids=[file.id],
#     content="""
# You are an AI trained to analyze 10-K reports and provide ratings for various aspects of a company. 
# You have just finished analyzing the attached 10-K report. 
# Please provide ratings for the following aspects from 1 to 100, where 1 is the lowest rating and 100 is the highest rating.
# Your response should be in JSON format and include the following fields:

# - "market_position_rating": The company's market position rating
# - "competitive_analysis_rating": The company's competitive analysis rating
# - "industry_market_analysis": The company's industry and market analysis rating
#     """
# )

# Part 2
client.beta.threads.messages.create(
    thread_id=thread.id,
    role="user",
    file_ids=[file.id],
    content="""
You are an AI trained to analyze 10-K Part 2 reports and provide ratings for various aspects of a company. 
You have just finished analyzing the attached 10-K report Part 2. 
Please provide ratings for the following aspects from 1 to 100, where 1 is the lowest rating and 100 is the highest rating.
Your response should be in JSON format and include the following fields:

- "liquidity_rating": The company's liquidity rating
- "solvency_rating": The company's solvency rating
- "financial_risk_rating": The company's financial risk rating
    """
)

# client.beta.threads.messages.create(
#     thread_id=thread.id,
#     role="user",
#     file_ids=[file.id],
#     content="""
# You are an AI trained to analyze 10-K Part 4 reports and provide ratings for various aspects of a company. 
# You have just finished analyzing the attached 10-K report Part 4. 
# Please provide ratings for the following aspects from 1 to 100, where 1 is the lowest rating and 100 is the highest rating.
# Your response should be in JSON format and include the following fields:

# - "compliance_rating": The company's compliance rating
# - "market_risk_rating": The company's market risk rating
# - "revenue_growth_rating": The company's revenue growth rating
# - "esg_rating": The company's ESG (Environmental, Social, Governance) rating
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