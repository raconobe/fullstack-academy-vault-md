---
type: solution
language: Java
topic: OOP Design
---

# 💡 Exercise Solution: Banking System (Java)

**Related Theory:** [[Software Design Principles]] | **Course:** [[00 - Java MOC]]

## 🎯 Problem Statement
Design a banking system using Object-Oriented Principles.

## 💻 Code Solution
```java
public class Account {
    private String owner;
    private double balance;

    public Account(String owner, double balance) {
        this.owner = owner;
        this.balance = balance;
    }

    public void deposit(double amount) {
        this.balance += amount;
    }
}
```

```


<FollowUp label="Would you like a specific template for drafting your own course outline inside Obsidian?" query="Can you give me an Obsidian template for creating and drafting my own tech course outline?"/>

```


