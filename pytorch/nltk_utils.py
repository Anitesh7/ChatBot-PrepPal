import nltk
import numpy as np
# nltk.download('punkt')
from nltk.stem.porter import PorterStemmer
stemmer = PorterStemmer()

def tokenize(sentense):
    return nltk.word_tokenize(sentense)

def stem(word):
    return stemmer.stem(word.lower())

def bag_of_words(tokenized_sentense, all_words):
    
    tokenized_sentense = [stem(w) for w in tokenized_sentense]

    bag = np.zeros(len(all_words),dtype = np.float32)
    for idx, w in enumerate(all_words):
        if w in tokenized_sentense:
            bag[idx] = 1.0
    return bag

sentense = ["Hello", "How", "Are", "You"]
words = ["hi", "hello", "I", "You", "you", "bye", "how"]
bag = bag_of_words(sentense,words)
# print(bag)
