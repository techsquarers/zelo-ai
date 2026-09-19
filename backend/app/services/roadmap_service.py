from typing import List, Dict, Any


def generate_sde_roadmap(profile: dict) -> List[Dict[str, Any]]:
    """Simple rule-based roadmap for SDE (MVP)"""
    daily_hours = profile.get("daily_hours") or 2
    weak_areas = [w.lower() for w in (profile.get("weak_areas") or [])]

    phases = [
        {
            "phase": 1,
            "title": "Foundation Strengthening",
            "duration_weeks": 3,
            "focus": ["DSA Basics", "Problem Solving"],
            "goals": [
                "Complete arrays, strings, hashing",
                "Solve 40-50 easy problems",
                "Learn time & space complexity"
            ]
        },
        {
            "phase": 2,
            "title": "Core DSA + Problem Patterns",
            "duration_weeks": 4,
            "focus": ["Trees", "Graphs", "Recursion", "DP Intro"],
            "goals": [
                "Master trees & binary search",
                "Solve 60+ medium problems",
                "Start pattern recognition"
            ]
        },
        {
            "phase": 3,
            "title": "System Design + Projects",
            "duration_weeks": 4,
            "focus": ["System Design Basics", "Backend Project"],
            "goals": [
                "Learn HLD & LLD fundamentals",
                "Build 1 solid full-stack/backend project",
                "Write clean documentation"
            ]
        },
        {
            "phase": 4,
            "title": "Interview Preparation",
            "duration_weeks": 3,
            "focus": ["Mock Interviews", "Revision", "Behavioral"],
            "goals": [
                "Daily revision of weak topics",
                "Solve mixed problem sets",
                "Practice system design questions"
            ]
        }
    ]

    # Simple personalization
    if "system design" in weak_areas or "system_design" in weak_areas:
        phases[2]["duration_weeks"] += 1

    if daily_hours < 2:
        for p in phases:
            p["duration_weeks"] = max(2, p["duration_weeks"] - 1)

    return phases


def generate_roadmap_for_user(profile_data: dict, target_role: str) -> dict:
    target_role = target_role.lower()

    if "sde" in target_role or "software" in target_role or "backend" in target_role:
        phases = generate_sde_roadmap(profile_data)
        title = f"SDE Roadmap – {target_role.title()}"
    else:
        # fallback
        phases = generate_sde_roadmap(profile_data)
        title = f"Career Roadmap – {target_role.title()}"

    return {
        "title": title,
        "target_role": target_role,
        "phases": phases
    }



    """This Python code is a rule-based engine designed to generate custom Software Development Engineer (SDE) learning paths. It acts as the core business logic (Minimum Viable Product, or MVP) that populates the phases JSON block in your database.
------------------------------
## 🧠 1. The Core Engine: generate_sde_roadmap
This function takes a user's profile dictionary, builds a standard 4-phase study track, and then adapts the timeline based on their background.

* Extraction & Fallbacks:
* It checks how many hours a user can study per day (daily_hours). If not provided, it defaults to 2 hours.
   * It grabs the user's weak_areas list and converts everything to lowercase to avoid capitalization bugs.
* The Baseline Blueprint: It defines 4 distinct learning milestones:
* Phase 1: Foundation Strengthening (DSA Basics, Arrays/Strings, Easy LeetCode).
   * Phase 2: Core DSA & Patterns (Trees, Graphs, Recursion, Medium Problems).
   * Phase 3: System Design & Projects (HLD/LLD basics, building a backend application).
   * Phase 4: Interview Prep (Mock interviews, behavioral practice, revision).
* 💡 Simple Rules-Based Personalization:
* Rule A: If the user lists "system design" as a weakness, the engine automatically adds 1 week to Phase 3 so they have more time to study it.
   * Rule B: If the user can study less than 2 hours a day (daily_hours < 2), it attempts to adjust the durations (though the math p["duration_weeks"] - 1 actually shortens the phases, which looks like a small placeholder logic bug you might want to switch to a + 1 later to give them more time!).

------------------------------
## 👔 2. The Orchestrator: generate_roadmap_for_user
This function serves as the main entry point that the rest of your app interacts with.

* Role Matching: It reads the requested target_role. If the role mentions words like "sde", "software", or "backend", it knows to trigger the SDE roadmap generator.
* Smart Fallback: If the user enters an unrecognized role (like "Data Scientist"), it safely falls back to the SDE generator anyway so the app doesn't crash, renaming it generically as a "Career Roadmap".
* Output Assembly: It packages everything cleanly into a dictionary matching the exact fields expected by your database model (title, target_role, phases).



"""