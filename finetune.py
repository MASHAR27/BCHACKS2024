from openai import OpenAI
client = OpenAI(api_key="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")

file = (client.files.create(
  file=open("gpt.jsonl", "rb"),
  purpose="fine-tune"
))

client.fine_tuning.jobs.create(
  training_file=file.id, 
  model="gpt-3.5-turbo-1106",
    hyperparameters={
    "n_epochs":2
  }
)
