# 1. საწყისი იმიჯი (Base Image)
# ვირტუალური მანქანის/კონტეინერის საძირკველი. ვიყენებთ Python 3.12-ის მსუბუქ (slim) Linux დისტრიბუტივს.
FROM python:3.12-slim

# 2. გარემოს ცვლადები (Environment Variables)
# PYTHONDONTWRITEBYTECODE - ხელს უშლის Python-ს .pyc ფაილების შენახვაში (კონტეინერისთვის არ არის საჭირო).
# PYTHONUNBUFFERED - უზრუნველყოფს, რომ ტერმინალში (ლოგებში) ლოგები ეგრევე გამოჩნდეს და არ დაყოვნდეს.
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# 3. სამუშაო დირექტორია (Working Directory)
# კონტეინერის შიგნით სად უნდა გადავიდეს ძირითადი მოქმედებები. შემდგომი ბრძანებები ამ папკაში შესრულდება.
WORKDIR /app

# 4. სისტემური დამოკიდებულებების დაყენება
# apt-get-ით ვტვირთავთ curl-ს და git-ს, რომლებიც აუცილებელია Gitleaks-ისა და Semgrep-ისთვის.
# rm -rf ასუფთავებს ქეშს, რომ იმიჯი ზედმეტად დიდი არ გამოვიდეს.
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    git \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# 5. Gitleaks CLI-ის გადმოწერა და ინსტალაცია
# ვიყენებთ Linux-ის ბინარულ ფაილს Github-დან, ვქაჩავთ, ვშლით და ვდებთ /usr/local/bin-ში, რომ გლობალურად იმუშაოს.
ARG GITLEAKS_VERSION=8.21.2
RUN curl -sSfL "https://github.com/gitleaks/gitleaks/releases/download/v${GITLEAKS_VERSION}/gitleaks_${GITLEAKS_VERSION}_linux_x64.tar.gz" \
    | tar -xz -C /usr/local/bin gitleaks \
    && chmod +x /usr/local/bin/gitleaks

# 6. Python პაკეტების დაყენება
# ჯერ ვკოპირებთ მხოლოდ requirements.txt-ს, რომ პაკეტები დაინსტალირდეს. 
# თუ კოდი შეიცვალა მაგრამ requirements არა, ეს ფენა ქეშიდან წაიკითხება და დრო არ დაიკარგება.
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 7. მთლიანი კოდის კოპირება
# ai-service/app/ ფოლდერს ვათავსებთ კონტეინერის /app/app ფოლდერში.
COPY app/ ./app/

# 8. საზიარო საქაღალდის შექმნა
# ეს ის საქაღალდეა, სადაც Java ZIP არქივს ატვირთავს და Python წაიკითხავს.
RUN mkdir -p /shared/scans

# 9. პორტის გახსნა
# ვაცხადებთ, რომ სერვისი უსმენს 8000 პორტს.
EXPOSE 8000

# 10. საბოლოო ბრძანება (Entrypoint / CMD)
# როდესაც კონტეინერი ჩაირთვება, ავტომატურად გაეშვება ეს ბრძანება (FastAPI / Uvicorn სერვერი).
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]