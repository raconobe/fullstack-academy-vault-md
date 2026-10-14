---
type: learning-path
subject: Java
status: active
started: 2026-10-14
target_completion: 2026-12-31
tags:
  - learning-path
  - java
---

# ☕ Learning Path: Java Mastery

> [!ABSTRACT] Goal
> Master core Java syntax, OOP design, Collections, and Concurrency using multiple learning sources simultaneously.

---

## 📚 Active Courses & Resources

| Source Name | Type | Format | URL / Platform | Status | Progress |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Java Programming Masterclass** | Video Course | Udemy / YouTube | [Link](https://example.com) | 🟡 In Progress | 35% |
| **Baeldung Java Tutorials** | Web Guide | Documentation | [Link](https://baeldung.com) | 🟡 Reference | Ongoing |
| **Dev.java Official Guide** | Web Course | Text/Interactive | [Link](https://dev.java) | 🟢 Complete | 100% |

---

## 🧭 Course Mapping & Cross-References
*Use this section to map equivalent chapters across your different learning sources.*

### 1. Object-Oriented Programming (OOP)
* **Video:** Modules 4 & 5 (Classes, Inheritance, Polymorphism)
* **Web (Baeldung):** OOP Principles in Java Series
* **Web (Dev.java):** Object-Oriented Programming Concepts
* **My Practice Notes:** [[Ch04 - Object-Oriented Programming]], [[Ex02 - Banking System]]

### 2. Collections & Streams
* **Video:** Module 8 (List, Set, Map, Lambda)
* **Web (Baeldung):** Java Collections Framework Guide
* **My Practice Notes:** [[Ch05 - Collections & Streams]]

---

## 📝 Learning Log & Daily Notes

| Date | Source Used | Topic Covered | Key Notes / Files Created |
| :--- | :--- | :--- | :--- |
| 2026-10-12 | Video | Interfaces & Abstract Classes | [[Ch04 - Object-Oriented Programming]] |
| 2026-10-13 | Web (Baeldung)| Java Generics deep dive | [[Java Generics Notes]] |
| 2026-10-14 | Video | Build Bank Account Exercise | [[Ex02 - Banking System]] |

---

## 💡 Quick Bookmark Links
- **Official Docs:** [Oracle Java 21 API](https://docs.oracle.com/en/java/javase/21/docs/api/index.html)
- **Practice Repo:** `git@github.com:myuser/java-practice-lab.git`
- **Exercises Vault Folder:** [[70 - Solutions & Practice/Java/]]




Nota

This is a common challenge when learning complex topics like Java—balancing multiple courses (a YouTube series, an official web tutorial, and a documentation platform) simultaneously while keeping track of your progress and resources.

To solve this, you need a **Learning Tracker MOC (Map of Content) Template**. This template acts as your central "dashboard" for a specific skill (e.g., _Java Master Learning Path_). It tracks every course you are taking, logs what you completed, and indexes all your practice notes.

## 🎯 The "Multi-Course Tracker" Template

Create a template file named **`Course Tracker Template.md`** inside your `90 - Templates/` folder and paste the following content:


## 💡 Why This Template Works Well for Multi-Course Learning

1. **Combines Video + Web in One Table:** You can see all 3 resources side-by-side in the **Active Courses** table so you don't forget where you left off in each one.
    
2. **Topic Cross-Referencing:** Different courses teach topics in different orders. The **Course Mapping** section lets you group equivalent lessons from your video and web courses under one concept header (e.g., _OOP_ or _Streams_).
    
3. **Auditable Learning Log:** The log table tracks _which source_ you consumed on a given day, helping you remember _how_ you learned a specific topic when you review your notes months later.
    
4. **Graph View Friendly:** Linking every chapter (`[[Ch04 - Object-Oriented Programming]]`) directly inside this tracker connects all your individual notes back to one central hub in Obsidian's visual graph.


Your overall note layout and structure in **`FullStack-Academy-md`** look **great!** The callout box for the goal and the clean table for tracking active courses are styled really well.

  

However, there is **one major structural detail in Obsidian** you should adjust: **the metadata at the top.**

  

## 🛠️ The Issue: YAML Frontmatter / Properties Syntax

In your screenshot, the top block starting with `type: learning-path` is rendering as plain text with a line underneath it:

  

Plaintext

```
type: learning-path
subject: Java
...
tags:
  • learning-path
  • java
```

In Obsidian, metadata needs to be wrapped in **triple dashes (`---`)** on line 1 so that Obsidian recognizes it natively as **Properties**. Without those dashes, plugins like _Dataview_, _Graph View_, and search won't be able to filter or query your tags and status properly.

  

### How to fix it:

In your document, edit the very top of the file so it looks like this:

  

YAML

```
---
type: learning-path
subject: Java
status: active
started: 2026-10-14
target_completion: 2026-12-31
tags:
  - learning-path
  - java
---
```

When you add the closing `---`, Obsidian will automatically convert this into a clean, interactive **Properties box** at the top of your note.

  

## 💡 3 Small Improvements to Make It Even Better

### 1. Enable Wikilinks in the Navigation Sidebar

In your file tree on the left, you currently have:

  

```
- `00-Java-Course Tracker`
    
      
    
      
    
- `01-JAVA-index`
    
      
    
      
    
- `Ch01 - Introduction & Setup`
    
      
    
      
    

```


Inside `01-JAVA-index`, make sure you add links back and forth using double brackets:

  



```Markdown
* [[00-Java-Course Tracker]]
* [[Ch01 - Introduction & Setup]]
```

This ensures your files are connected in Obsidian's **Graph View**.

  

### 2. Rename `00-Java-Course Tracker` to Avoid Confusion

Having both `00-Java-Course Tracker` and `01-JAVA-index` right next to each other in the `01_Java` folder can become redundant.

  

- **Option A:** Use `00-Java-Course Tracker` as your **main index page** (MOC) and merge the index links into it.
    
      
    
- **Option B:** Keep `01-JAVA-index` as the main navigation hub and rename the tracker file to something like `Java Learning Path`.
    
      
    

### 3. Add Progress Checkboxes in Your Table

Inside your **Active Courses & Resources** table, consider adding a column for the **Next Chapter / Milestone** so you instantly know where to resume when you sit down to study:

| **Source Name**       | **Type** | **Format** | **Status**     | **Next Lesson** | **Link**                                    |
| --------------------- | -------- | ---------- | -------------- | --------------- | ------------------------------------------- |
| **Java Video Course** | Video    | YouTube    | 🟡 In Progress | Ch 04 - OOP     | [Link](https://www.google.com/search?q=%23) |
| **Baeldung Guides**   | Web      | Text       | 🟢 Active      | Generics        | [Link](https://www.google.com/search?q=%23) |