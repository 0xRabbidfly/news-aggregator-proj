from textblob import TextBlob

def analyze_sentiment(text: str) -> dict:
    """
    Analyze the sentiment of a given text using TextBlob.
    Returns a dictionary containing polarity and label.
    """
    if not text:
        return {"polarity": 0.0, "label": "neutral"}
    
    analysis = TextBlob(text)
    polarity = analysis.sentiment.polarity
    
    # Determine label based on polarity
    if polarity > 0.1:
        label = "positive"
    elif polarity < -0.1:
        label = "negative"
    else:
        label = "neutral"
    
    return {
        "polarity": round(polarity, 2),
        "label": label
    } 