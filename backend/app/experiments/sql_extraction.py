import dspy
from dspy.functional import TypedPredictor
import logging
from typing import Optional

from app.experiments.sql_sample_gen import SQLSample

logger = logging.getLogger(__name__)

class SampleExtract(dspy.Signature):
    """Your goal is to extract the "SQL Example" from the provided answer. This section contains SQL queries intended to address the user's issue. 
    
    Follow these steps to ensure the SQL examples are accurate and executable:

	1. Extract the SQL Example: Identify and extract the SQL Example Section from the given answer. \
        This section should contain all the SQL queries that were generated.
	2. Review the SQL Example:
	  - Carefully review each SQL query to ensure it is accurate and can be executed directly.
      - Verify that the SQL syntax is fully supported and executable in TiDB Serverless.
      - Check for missing details, or syntax that might be unsupported in TiDB.
	3. Manual Adjustments If Necessary: If necessary, manually adjust the SQL queries to make them fully executable in TiDB Serverless. \
        This may include adding missing content, replacing placeholder table names, or modifying syntax to match TiDB's supported features
	4. Generate the Final SQL List: Provide the final, executable SQL Example Section as a list of SQL queries that can be directly used in TiDB Serverless.

    By following these instructions, you will help the user not only resolve their current query but also deepen their understanding of the topic through practical application.
    """

    QA_content: str = dspy.InputField(
        desc="The user's query that requires a step-by-step example to be generated."
    )
    sample: SQLSample = dspy.OutputField(
        desc="Step-by-step example to execute the SQL query in TiDB Serverless."
    )


class SQLExtractModule(dspy.Module):
    def __init__(self, dspy_lm: dspy.LM):
        super().__init__()
        self.dspy_lm = dspy_lm
        self.prog = TypedPredictor(SampleExtract)

    def forward(self, QA_content: str):
        with dspy.settings.context(lm=self.dspy_lm):
            return self.prog(QA_content=QA_content)


class SQlExtractor:
    def __init__(self, dspy_lm: dspy.LM, complied_program_path: Optional[str] = None):
        self.prog = SQLExtractModule(dspy_lm=dspy_lm)
        if complied_program_path is not None:
            self.prog.load(complied_program_path)

    def gen(self, QA_content: str) -> SQLSample:
        return self.prog(QA_content).sample
