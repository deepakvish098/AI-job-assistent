from matcher import match_resume


def test_resume_matching():


    resume= """
    python Flask SQL

    """

    job = """
    python SQL react
    """

    result  = match_resume(
        resume,
        job
    )

    assert result['score'] > 0
    assert "python" in result['matched']