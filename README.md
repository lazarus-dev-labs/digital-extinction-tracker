# Digital Extinction Tracker (Rune)

A web application that helps **identify, track, and preserve endangered cultural knowledge**—including folk stories, rare words, proverbs, and traditions—using **AI/ML** to analyze text and assign **risk levels**.

Developed by **Team Lazarus**, Rune aims to preserve cultural heritage in a **digital format**, making endangered knowledge accessible for future generations.

---

## Features

- **User Registration & Authentication**  
  Secure login and registration system to access preservation tools.

- **Preservation Submission**  
  Users can submit text data for preservation, which is verified by an administrator before approval.

- **Risk Analysis**  
  Uses AI/ML to evaluate the preservation requests and assign **risk scores** and **risk levels**.

- **Categorized Display**  
  Approved data is displayed publicly under **categories** like folklore, traditions, proverbs, and rare words.

- **Filtering & Search**  
  Users can filter preserved information by **category**, **risk level**, and **risk score**.

---

## Tech Stack

**Frontend:**  
- Vercel Deployment  
- Bun.js + Shadcn UI  
- React + TypeScript  

**Backend:**  
- FastAPI (Python 3.11)  
- Dockerized and hosted on **Azure App Service**  
- PyTorch + TorchVision for AI/ML text analysis  

**Database & Services:**  
- Firebase (Authentication, Storage, Analytics)  

---

## Getting Started

### Prerequisites

- Node.js / Bun.js installed  
- Python 3.11  
- Docker  
- Firebase account  
- Azure account (for production backend deployment)

---

### Local Development

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/digital-extinction-tracker.git
cd digital-extinction-tracker
