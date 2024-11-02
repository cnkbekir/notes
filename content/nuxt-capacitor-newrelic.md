---
id: "2"
title: "Nuxt - Capacitor - New Relic"
description: ""
date: "2023-11-16"
categories:
  - web
tags:
  - nuxt
  - capacitor
  - newrelic
cover: ""
---

Nuxt ve Capacitor ile geliştirdiğim mobil uygulamamı takip etmek için New Relic'i nasıl kurduğumu anlatıcam.
Öncelikle New Relic ekibinin sunduğu paketi yüklüyoruz:
```
npm i @newrelic/newrelic-capacitor-plugin && npx cap sync
```

New Relic hesabımızda Add Data butonuyla kurulum ekranını açarak listeden Capacitor'ü seçiyoruz. Buradaki bilgilerin çoğunu o ekranda da bulabilirsiniz. Alacağımız token'ı aşağıdaki kodda da kullanıcaz.

Vue.js projelerinde App.vue dosyasında yapılan paket ayarlarını Nuxt projelerinde plugins klasöründe yapabiliyoruz. Buraya eklediğimiz dosyalar otomatik çalışıyor. Bilgi için: [plugins/ · Nuxt Directory Structure](https://nuxt.com/docs/guide/directory-structure/plugins) 

Projede plugins klasörü altında newrelic.ts dosyasını oluşturuyoruz:
```
import { NewRelicCapacitorPlugin, NREnums, AgentConfiguration } from '@newrelic/newrelic-capacitor-plugin';
import { Capacitor } from '@capacitor/core';

export default defineNuxtPlugin(() => {
  var appToken;
  if (Capacitor.getPlatform() === 'ios') {
    appToken = '...';
  } else {
    appToken = '...';
  }

  let agentConfig : AgentConfiguration = {
    //Android Specific
    // Optional:Enable or disable collection of event data.
    analyticsEventEnabled: true,

    // Optional:Enable or disable crash reporting.
    crashReportingEnabled: true,

    // Optional:Enable or disable interaction tracing. Trace instrumentation still occurs, but no traces are harvested. This will disable default and custom interactions.
    interactionTracingEnabled: true,

    // Optional:Enable or disable reporting successful HTTP requests to the MobileRequest event type.
    networkRequestEnabled: true,

    // Optional:Enable or disable reporting network and HTTP request errors to the MobileRequestError event type.
    networkErrorRequestEnabled: true,

    // Optional:Enable or disable capture of HTTP response bodies for HTTP error traces, and MobileRequestError events.
    httpResponseBodyCaptureEnabled: true,

    // Optional:Enable or disable agent logging.
    loggingEnabled: true,

    // Optional:Specifies the log level. Omit this field for the default log level.
    // Options include: ERROR (least verbose), WARNING, INFO, VERBOSE, AUDIT (most verbose).
    logLevel: NREnums.LogLevel.ERROR,

    // iOS Specific
    // Optional:Enable/Disable automatic instrumentation of WebViews
    webViewInstrumentation: true,

    // Optional:Set a specific collector address for sending data. Omit this field for default address.
    // collectorAddress: "",

    // Optional:Set a specific crash collector address for sending crashes. Omit this field for default address.
    // crashCollectorAddress: "",

    // Optional:Enable or disable sending JS console logs to New Relic.
    sendConsoleEvents: true,

    // Optional: nable or disable reporting data using different endpoints for US government clients.
     fedRampEnabled: false
  }

  NewRelicCapacitorPlugin.start({appKey:appToken, agentConfiguration:agentConfig})
})

```

Burada fedRampEnabled ayarı ile ilgili bir sorun varmış. Bundan dolayı çok test yapmak zorunda kaldım. GitHub'da bir issue oluşturdum ve sorun kısa sürede çözüldü: [Can't get android logs - Nuxt3 - Ionic · Issue #59 · newrelic/newrelic-capacitor-plugin (github.com)](https://github.com/newrelic/newrelic-capacitor-plugin/issues/59)

Android için build.gradle dosyamızı düzenliyoruz:
```
buildscript {
    ...
    repositories {
      ...
      mavenCentral()
    }
    dependencies {
      ...
      classpath "com.newrelic.agent.android:agent-gradle-plugin:7.1.0"
    }
  }
```

Ve app/build.gradle dosyamızı düzenliyoruz:
```
apply plugin: "com.android.application"
apply plugin: 'newrelic' // <-- bu satırı ekle
```

Projelerimizi derleyerek yayına alabiliriz.