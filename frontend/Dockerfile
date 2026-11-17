FROM nginx:alpine

# ვშლით Nginx-ის ნაგულისხმევ საწყის გვერდს
RUN rm -rf /usr/share/nginx/html/*

# ჩვენი frontend კოდის კოპირება Nginx-ის სამუშაო დირექტორიაში
COPY . /usr/share/nginx/html

# Nginx უსმენს 80 პორტს (docker-compose-ში ვუკავშირებთ 3000-ს)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]