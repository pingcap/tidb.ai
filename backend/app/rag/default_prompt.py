DEFAULT_INTENT_GRAPH_KNOWLEDGE = """\
Given a list of relationships of a knowledge graph as follows. When there is a conflict in meaning between knowledge relationships, the relationship with the higher `weight` and newer `last_modified_at` value takes precedence.

Knowledge sub-queries:

{% for sub_query, data in sub_queries.items() %}

Sub-query: {{ sub_query }}

  - Entities:

{% for entity in data['entities'] %}

    - Name: {{ entity.name }}
    - Description: {{ entity.description }}

{% endfor %}

  - Relationships:

{% for relationship in data['relationships'] %}

    - Description: {{ relationship.rag_description }}
    - Last Modified At: {{ relationship.last_modified_at }}
    - Meta: {{ relationship.meta | tojson(indent=2) }}

{% endfor %}

{% endfor %}
"""

DEFAULT_NORMAL_GRAPH_KNOWLEDGE = """\
Given a list of relationships of a knowledge graph as follows. When there is a conflict in meaning between knowledge relationships, the relationship with the higher `weight` and newer `last_modified_at` value takes precedence.

---------------------
Entities:

{% for entity in entities %}

- Name: {{ entity.name }}
- Description: {{ entity.description }}

{% endfor %}

---------------------

Knowledge relationships:

{% for relationship in relationships %}

- Description: {{ relationship.rag_description }}
- Weight: {{ relationship.weight }}
- Last Modified At: {{ relationship.last_modified_at }}
- Meta: {{ relationship.meta | tojson(indent=2) }}

{% endfor %}
"""

DEFAULT_CONDENSE_QUESTION_PROMPT = """\
---------------------
Knowledge graph information is below
---------------------

{{graph_knowledges}}

---------------------

Given a conversation (between Human and Assistant) and a follow-up message from the Human, use the context from the previous conversation to rewrite the follow-up message into a standalone, detailed question (Note: The language should be consistent with the follow up message from Human). Ensure the refined question captures all relevant context and is written in a way that maximizes the effectiveness of a vector search to retrieve precise and comprehensive information.


Example:

Chat history:

Human: “I’m exploring options for a database solution for my company’s needs.”
Assistant: “You might want to consider TiDB, a distributed SQL database that offers high availability and scalability.”

Followup question:

  "What is TiDB?"
  
Refined standalone question:

Can you provide an in-depth explanation of TiDB, including its architecture, key features, and how it ensures high availability and scalability?


---------------------

Chat history:

{{chat_history}}

---------------------

Followup question:

{{question}}

---------------------

Refined standalone question:
"""


DEFAULT_TEXT_QA_PROMPT = """\
---------------------
Knowledge graph information is below
---------------------

{{graph_knowledges}}

---------------------
Context information is below.
---------------------

<<context_str>>

---------------------

Answer Format:

Use markdown footnote syntax (for example: [^1]) to indicate sources you used.
Each footnote must correspond to a unique source. Do not use the same source for multiple footnotes.

### Examples of Correct Footnote Usage (no the unique sources and diverse sources):
[^1]: [TiDB Overview | PingCAP Docs](https://docs.pingcap.com/tidb/stable/overview)
[^2]: [TiDB Architecture | PingCAP Docs](https://docs.pingcap.com/tidb/stable/architecture)

### Examples of Incorrect Footnote Usage (Avoid duplicating the same source for multiple footnotes):
[^1]: [TiDB Introduction | PingCAP Docs](https://docs.pingcap.com/tidb/v5.4/overview)
[^2]: [TiDB Introduction | PingCAP Docs](https://docs.pingcap.com/tidb/v5.4/overview)
[^3]: [TiDB Introduction | PingCAP Docs](https://docs.pingcap.com/tidb/dev/overview)
[^4]: [TiDB Introduction | PingCAP Docs](https://docs.pingcap.com/tidb/stable/overview)

---------------------

Answer Language:

Respond in the language of the original question; for instance, reply in Chinese if the original question was asked in Chinese and in English if it was asked in English!

---------------------

As a TiDB customer support engineer, please do not fabricate any knowledge. If the instruction out of scope (not related with TiDB) or you cannot get knowledge from the context, please just directly state "you do not know", rather than constructing nonexistent and potentially fake information!!!

First, analyze the provided context information without assuming prior knowledge. Identify all relevant aspects of knowledge contained within. Then, from various perspectives and angles, answer questions as thoroughly and comprehensively as possible to better address and resolve the user's issue.


Refined Question used to search:
<<query_str>>

Answer:
"""

DEFAULT_REFINE_PROMPT = """\
The original question is:

<<query_str>>

---------------------
We have provided an existing answer:
---------------------

<<existing_answer>>

---------------------
We have the opportunity to refine the existing answer (only if needed) with some more knowledge graph and context information below.

---------------------
Knowledge graph information is below
---------------------

{{graph_knowledges}}

---------------------
Context information is below.
---------------------

<<context_msg>>

---------------------
Given the new context, refine the original answer to better answer the query. If the context isn't useful, return the original answer.
Refined Answer:
"""
