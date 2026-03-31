---
title: "Introduction to Machine Learning"
date: 2025-01-08
categories: ["AI/ML"]
tags: ["Python", "TensorFlow"]
content_types: ["Article"]
authors: ["Your Name"]
summary: "An overview of supervised learning fundamentals with a practical TensorFlow example."
thumbnail: ""
thumb_label: "ML"
---

Machine learning enables systems to learn patterns from data without being explicitly programmed. At its core, supervised learning maps inputs to outputs using labeled training data.

## The Training Loop

Every ML model follows the same fundamental cycle: forward pass, loss computation, backward pass, and parameter update. Understanding this loop is essential before using any framework.

```python
import tensorflow as tf
import numpy as np

# Generate synthetic data
X = np.random.randn(1000, 3).astype(np.float32)
y = (X @ np.array([2.0, -1.0, 0.5]) + 0.3).astype(np.float32)

# Define a simple model
model = tf.keras.Sequential([
    tf.keras.layers.Dense(16, activation='relu', input_shape=(3,)),
    tf.keras.layers.Dense(8, activation='relu'),
    tf.keras.layers.Dense(1)
])

model.compile(optimizer='adam', loss='mse', metrics=['mae'])
history = model.fit(X, y, epochs=50, batch_size=32, validation_split=0.2)
```

## Overfitting and Regularization

A model that performs well on training data but poorly on unseen data is overfitting. Common remedies include dropout, L2 regularization, and early stopping. Always monitor your validation loss — if it starts increasing while training loss decreases, your model is memorizing rather than learning.

## Feature Engineering

Raw data rarely goes directly into a model. Feature engineering transforms inputs into representations that make patterns easier to learn. Normalization, encoding categorical variables, and creating interaction features can dramatically improve model performance.

## Evaluation Metrics

Accuracy alone is insufficient for most real-world problems. Consider precision, recall, and F1-score for classification tasks. For regression, examine RMSE and R-squared alongside MAE. Choose metrics that align with your business objectives.
