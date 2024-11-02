---
id: "1"
title: "Statik Wordpress Sitesi"
description: ""
date: "2023-11-16"
categories:
  - web
tags:
  - wordpress
cover: ""
---

Kullanacağımız sistemler:
- Wordpress
- CloudFlare
- [Simply Static – WordPress plugin](https://wordpress.org/plugins/simply-static/)
- Github Actions
- Bash script


Wordpress'te simply statik eklentisini kuruyoruz. Eklentinin Settings -> Deployment sayfasında Deployment Method olarak Local Directory seçiyoruz. PATH olarak /var/www/static/ girdim. 
Bulunduğumuz domainle aynı yerde yayınlamayacağımız için Replacing URLs ayarlarında Relative Paths seçip / değerini giriyoruz. 
Advanced ayarlar sayfasında da Force URL Replacements seçeneğini aktifleştiriyoruz.

Benim DNS ayarlarım CloudFlare'de. Sitemi Proxied seçeneğini kapatıp sadece DNS kaydı olarak tutuyorum. certbot ile sunucuda SSL ayarlıyorum.

Sunucuda dizini oluşturup eklentide Generate Static Files butonuna basarak işlemi başlatıyoruz.
Debugging Mode ayarı var, onu aktifleştirebiliriz. Activity Log sayfasından işlemi takip edebiliyoruz.

Sunucuda /var/www/static/ dizinini GitHub'da bir repo açarak oraya yüklüyoruz. 
Deploy keys ile yapmak için: [How to Use GitHub Deploy Keys (dylancastillo.co)](https://dylancastillo.co/how-to-use-github-deploy-keys/)

İlk sefer dışında buraya girmeye gerek kalmasın diye güncellemeleri push'layan bir bash script'i root hesabındayken crontab'a ekliyorum. 

```
* * * * * [ $(find /var/www/ufkayolculuk_wp/index.html -type f | wc -l) -gt 0 ];then /var/www/static.sh && cd /var/www/static && git add . && git commit -m "Automatic Commit" && git push; fi
```

Baştaki if komutunu bir kaç denemeden sonra farkederek ekledim. Statik dosyaların generate işlemi sırasında index.html olmadığı için bu sorgu sayesinde o işlemin bitmesini beklemiş oluyorum.

GitHub deploy keys kullanmazsam Git işlemleri yapılabilmesi için şu komutu kullanıp bir defa manuel git commit ve push işlemini yapıyorum
```
git config --global credential.helper store
```


Cron job ile çalıştırılan /var/www/static.sh dosyası:
```
#!/bin/sh
/usr/bin/find /var/www/static/ -maxdepth 3 -type f -name 'index.html' -exec /usr/bin/sed -i 's+<\\/+</+g' {} \;
```

```
chmod +x /var/www/static.sh
```

CloudFlare Pages'ta yeni bir kayıt oluşturuyoruz, GitHub'daki repomuza bağlıyoruz. Statik dosyalar olduğu için build ayarlarında değişiklik yapmadan yayına alıyoruz. 

Artık GitHub'da her değişiklikte sitemiz güncellenicek. Ayrıca CloudFlare Pages'taki pages.dev uzantılı adresi Custom Domains sayfasından kendi alan adınıza bağlayabiliyorsunuz. 
