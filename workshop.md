# RCA Workflow – Skills & Rules Driven

This document explains the **Root Cause Analysis (RCA) workflow** implemented using
explicit **skills**, **rules**, and a **human approval loop**.  
The workflow is designed to ensure **completeness**, **accuracy**, and a **blameless culture**.

---

## Objectives

- Ensure all RCA documents contain **mandatory sections**
- Prevent **hallucinated or incomplete analysis**
- Maintain a **blameless, system-focused tone**
- Produce **actionable, preventive outcomes**
- Enforce **human review before finalization**

---

## High-Level Flow

1. Collect incident details step by step  
2. Validate completeness of information  
3. Scrutinise the proposed solution  
4. Enforce blameless tone  
5. Generate actionable remediation items  
6. Present for human review  
7. Save approved RCA  

---

## Skills Used in the Workflow

### 1. Incident Details
Responsible for structured data collection.

Captures:
- What happened
- When it happened
- Impact and severity
- Evidence (logs, metrics, alerts)

This skill operates **incrementally** and supports multiple iterations.

---

### 2. Scrutiny
Responsible for validating the quality of analysis.

Checks:
- Are assumptions explicitly stated?
- Is evidence cited for conclusions?
- Are causes systemic rather than individual?

This skill **does not generate new facts**.  
It evaluates consistency, reasoning, and alignment with known data.

---

### 3. Generate Action Items
Responsible for producing remediation steps.

Ensures action items:
- Prevent recurrence
- Have clear ownership
- Are measurable and trackable

Action items focus on **system improvements**, not individual actions.

---

## Rules Enforced

### Rule 1: Mandatory Sections Must Be Present
Before scrutiny begins, the system checks that all required RCA sections exist.

If any section is missing:
- The workflow halts
- Missing information is explicitly requested
- The workflow resumes only after completion

This rule prevents partial or fabricated analysis.

---

### Rule 2: Tone Must Be Blameless
All generated content must follow a **blameless post-incident culture**.

The workflow actively rejects:
- Individual blame
- Emotionally charged language
- Speculative or judgmental statements

If violations are detected:
- Content is rewritten
- Scrutiny is re-run before continuing

---

## Detailed Workflow Explanation

### Step 1: Start Workflow
The workflow begins when an incident is identified and RCA creation is initiated.

---

### Step 2: Collect Incident Details
The **Incident Details skill** gathers information step by step.

This step may repeat multiple times until:
- All mandatory sections are filled
- Information is consistent and verifiable

---

### Step 3: Validate Completeness
A rule check verifies whether all required sections are present.

- **Yes** → Proceed to scrutiny  
- **No** → Request missing information and return to data collection  

This ensures no RCA proceeds with incomplete context.

---

### Step 4: Scrutinise the Solution
The **Scrutiny skill** evaluates the quality of the analysis.

Focus areas:
- Logical consistency
- Evidence-backed reasoning
- System-level causes

This step is critical for preventing hallucinations.

---

### Step 5: Enforce Blameless Tone
A rule check evaluates tone and language.

- **Yes (Blameless)** → Continue  
- **No** → Rewrite content and re-enter scrutiny  

This ensures cultural alignment and psychological safety.

---

### Step 6: Generate Action Items
The **Generate Action Items skill** creates remediation tasks.

Each action item includes:
- Description
- Owner
- Expected outcome

Generated action items are stored as a draft under:
