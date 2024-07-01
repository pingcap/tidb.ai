DEFAULT_CONDENSE_QUESTION_PROMPT = """\
Given a list of relationships of knowledge graph, the format of description of relationship is as follows:

- SOURCE_ENTITY_NAME -> RELATIONSHIP -> TARGET_ENTITY_NAME

When there is a conflict in meaning between knowledge relationships, the relationship with the higher `weight` and newer `last_modified_at` value takes precedence.

Knowledge relationships:

{% for relationship in relationships %}

description: {{relationship.rag_description}}
weight: {{relationship.weight}}
last_modified_at: {{relationship.last_modified_at}}
meta:
{{relationship.meta | tojson(indent=2) }}

{% endfor %}

---------------------

Entities:

{% for entity in entities %}

name: {{entity.name}}
description: {{entity.description}}
meta:
{{entity.meta | tojson(indent=2)}}

{% endfor %}

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

<Entities>

{% for entity in entities %}

name: {{entity.name}}
description: {{entity.description}}
meta:
{{entity.meta | tojson(indent=2)}}

{% endfor %}

<Relationships>

Given a list of relationships of knowledge graph, the format of description of relationship is as follows:

- SOURCE_ENTITY_NAME -> RELATIONSHIP -> TARGET_ENTITY_NAME

When there is a conflict in meaning between knowledge relationships, the relationship with the higher `weight` and newer `last_modified_at` value takes precedence.

relationship:

{% for relationship in relationships %}

description: {{relationship.rag_description}}
weight: {{relationship.weight}}
last_modified_at: {{relationship.last_modified_at}}
meta:
{{relationship.meta | tojson(indent=2)}}

{% endfor %}

---------------------
Context information is below.
---------------------

<<context_str>>

---------------------

Answer Format:

Use markdown footnote syntax (for example: [^1]) to indicate sources you used for each sentences! The source_title and source_uri field can be used as the footnote title and link.

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

<Entities>

{% for entity in entities %}
name: {{entity.name}}
description: {{entity.description}}
meta:
{{entity.meta | tojson(indent=2)}}


{% endfor %}

<Relationships>

Given a list of relationships of knowledge graph, the format of description of relationship is as follows:

- SOURCE_ENTITY_NAME -> RELATIONSHIP -> TARGET_ENTITY_NAME

When there is a conflict in meaning between knowledge relationships, the relationship with the higher `weight` and newer `last_modified_at` value takes precedence.

relationship:

{% for relationship in relationships %}
description: {{relationship.rag_description}}
weight: {{relationship.weight}}
last_modified_at: {{relationship.last_modified_at}}
meta:
{{relationship.meta | tojson(indent=2)}}



{% endfor %}

---------------------
Context information is below.
---------------------

<<context_msg>>

---------------------
Given the new context, refine the original answer to better answer the query. If the context isn't useful, return the original answer.
Refined Answer:
"""
