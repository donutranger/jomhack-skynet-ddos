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
  file=open("YumeSdnBhd-SampleBusinessPlan.pdf", "rb"),
  purpose='assistants'
)

client.beta.assistants.files.create(
    assistant_id=assistant.id,
    file_id=file.id
)

thread = client.beta.threads.create()

message = client.beta.threads.messages.create(
    thread_id=thread.id,
    role="user",
    file_ids=[file.id],
    content="I want to evaluate the risk of the company. based on the business plan attached."
)

run = client.beta.threads.runs.create(
  thread_id=thread.id,
  assistant_id=assistant.id,
  instructions="Provide risk evaluation for the company from 1 to 100. 1 is the highest risk and 100 is the lowest risk.",
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