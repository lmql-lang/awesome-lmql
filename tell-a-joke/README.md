# Tell A Joke

```
# instructions + few-shot samples
"""
A list of good dad jokes. A indicates the punchline
Q: How does a penguin build its house?
A: Igloos it together.
Q: Which knight invented King Arthur's Round Table?
A: Sir Cumference.
"""

# generate a joke
"Q:[JOKE]\n" where len(TOKENS(JOKE)) < 120 and STOPS_AT(JOKE, "?")
"A:[PUNCHLINE]" where STOPS_AT(PUNCHLINE, "\n") and len(TOKENS(PUNCHLINE)) > 1
```

This snippet uses instructions and few-shot examples to generate a question-answering-style joke.

Token length and stopping conditions on `JOKE` and `PUNCHLINE` ensure that both are generated according to the desired format.