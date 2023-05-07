({ queries: [
   
   {
      category: "Feature Preview", 
      queries: [
         {
            // hello world
            name: "👨‍👩‍👧 Types / JSON",
            description: "Robust generation of typed data.",
            code: `import lmql
from dataclasses import dataclass

@dataclass
class Employer:
   employer_name: str
   location: str

@dataclass
class Person:
   name: str
   age: int
   employer: Employer
   job: str

argmax
    "Alice is a 21 years old and works as an engineer at LMQL Inc in Zurich, Switzerland: [p]\\n"
    "The name is {p.name} and she works in {p.employer.location}."
from 
    "chatgpt" 
where 
    type(p) is Person
`,
            state: ''
         },
         {
            // hello world
            name: "❤️ In-Context Functions",
            description: "Affect sentiment with constraints.",
            code: `@lmql.query
async def mood_description(m: str):
    '''lmql
    argmax(cache="mood.tokens")
        print("Generating mood for", m)
        """Provide a one sentence instruction that prompts a model to write text that 
        is written in a {m} tone, addressing some previously provided question.\\n"""
        "[SUMMARY]\\n"
        return SUMMARY.strip();
    from
        "chatgpt"
    '''

@lmql.query
async def mood(m: str):
    '''lmql
    incontext
        """
        Instruction: {mood_description(m)}
        Answer: [RESPONSE]
        """
        return RESPONSE.strip(); 
    where
        stops_at(RESPONSE, ".") and stops_at(RESPONSE, "\\n")
    '''

argmax
    for q in ["Hi", "Who are you", "How is your day going?"]:
        "Q: {q}\\n"
        "A: [RESPONSE]\\n"
from 
    "chatgpt" 
where 
    mood(RESPONSE, "loving like a partner")
`,
            state: ''
         },
         {
            // hello world
            name: "📝 Write A Poem",
            description: "incontext for intermediate instr..",
            code: `@lmql.query
async def rhyme():
   '''
   incontext
      """
      Above is the beginning of the poem. Generate the next verse that rhymes with the last line and has the same number of syllables.
      [VERSE]
      """
      return VERSE
   where
      stops_before(VERSE, "\\n")
   '''

@lmql.query
async def first_verse():
   '''
   incontext
      """
      Generate a verse that would be perfect for the start of a beautiful rhyme. 
      [VERSE]
      """
      return VERSE
   where
      stops_before(VERSE, "\\n")
   '''

argmax
    "[FIRST_VERSE]\\n"
    for i in range(5):
       "[VERSE]\\n"
from 
    "chatgpt" 
where 
    rhyme(VERSE) and first_verse(FIRST_VERSE)
`,
            state: ''
         },
      ]
   }
]})
