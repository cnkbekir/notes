---
id: "3"
title: "Nuxt Studio Kullanarak Blog Sitesi"
description: ""
date: "2024-11-03"
categories:
  - web
tags:
  - nuxt
cover: ""
---

Geçen yıl Obsidian'da tuttuğum notları Obsidian publish kullanarak yayınlamıştım. Daha sonra ücretini ödemek istemedim ve site kapandı. Ücretsiz bir şekilde yayınlamak ve Nuxt kullanmak istemiştim, bu yazımda nasıl yaptığımı yazıcam.

Nuxt Studio, git tabanlı bir cms sunuyor. Markdown dosyalarınızı panelden düzenleyebiliyorsunuz, yaptığınız değişiklikler git hesabınızdan commit atılıyor. Hazır gelen yaygınlaştırma scripti var, siz deploy butonuna tıkladığınızda siteniz otomatik yayınlanıyor.

<https://github.com/bloggrify/bloggrify> kullandım.

bilgisayarımda git klasörlerimin olduğu dizinde terminali açıp şunu çalıştırdım:
git clone <https://github.com/bloggrify/demo-mistral.git> bloggrify

yeni repo oluşturdum <https://github.com/new>
oluşturduktan sonra bilgisayarımda oluşturduğum klasörde şu komutları çalıştırdım:
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin <https://github.com/cnkbekir/notes.git>
git push -u origin main

push işleminde şöyle bi hata aldım:
error: RPC failed; HTTP 400 curl 22 The requested URL returned error: 400
send-pack: unexpected disconnect while reading sideband packet

Şu komutu yazdıktan sonra hata çözüldü, push işlemini tekrar yaptım:
git config --global http.postBuffer 157286400

cloudflare'de DNS ayarlarıma CNAME kaydı ekledim;
name: notes
Content: cnkbekir.github.io
Proxied

bloggrify demosundan gelen .github/workflows/deploy.yml dosyasını sildim.

repo'ya kodları attıktan sonra nuxt studio kullandım. New project -> Import a nuxt project
menüde project -> deploy sayfasında Deploy butonuna tıkladım. İlk işlemden sonra "Use custom domain" seçeneği aktifleşti, onu işaretledim. Domain alanına notes.bekir.dev girip kaydettim.

ilk deployment işlemi pnpm versiyon hatası verdi. (bu hataları github reposunda actions içerisinde görebiliyoruz.)
repo'daki .github/workflows/studio.yml dosyasında pnpm/action-setup\@v4 kısmına with şeçeneği ekledim:

```yml
uses: pnpm/action-setup@v4
    with:
        version: 9
```

başka hatalar da verdi. package-lock dosyalarını sildim, nuxt versiyonunu yükselttim.
commitleyince yine otomatik deploy başladı, siteyi yayınladı.

site ayarlarını yaptım, [commitlerime](https://github.com/cnkbekir/notes/commit/2b1319bbf92e4dee714b3e1dd65c36adacc838ce) bakılabilir.
