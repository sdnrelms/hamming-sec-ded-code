
# 💻 Hamming SEC-DED Kod Simülatörü

## 📌 Proje Özeti
Bu proje, **Hamming SEC-DED (Single Error Correction – Double Error Detection)** algoritmasını temel alan bir **web tabanlı simülatördür**. Kullanıcı, 8, 16 veya 32 bit uzunluğunda veri girerek:

- Hamming kodunu üretebilir,  
- Belleğe yapay hata ekleyebilir,  
- Hataları tespit edip düzeltebilir.

Projede JavaScript ile algoritma uygulanmış, HTML ve CSS ile kullanıcı dostu bir arayüz geliştirilmiştir. Bilgisayar Mimarisi dersi kapsamında dönem projesi olarak hazırlanmıştır.


## 🚀 Özellikler
- [x] 8, 16 ve 32 bit veri desteği  
- [x] Hamming SEC-DED kod üretimi  
- [x] Yapay hata oluşturma  
- [x] Hata tespiti ve düzeltme (tek-bit düzeltme, çift-bit uyarısı)  
- [x] Genel parite kontrolü  
- [x] Görsel ve açıklamalı arayüz  
- [x] Hatalı bitlerin kırmızıyla vurgulanması  



## 🛠️ Kullanılan Teknolojiler

| Teknoloji | Açıklama |
|----------|----------|
| HTML5 | Arayüz yapısı |
| CSS3 | Görsel stil ve tasarım |
| JavaScript | Algoritma ve dinamik işlemler |



## 📷 Simülatörü Kullanma

- İstenilen boyut seçilir ve veri girilir.
![alt text](https://github.com/sdnrelms/hamming-sec-ded-code/blob/main/img/img1.png)
<br>

- Hamming kodu oluşturulur.
![alt text](https://github.com/sdnrelms/hamming-sec-ded-code/blob/main/img/img2.png)
<br>

- Hata oluşturmak istenilen pozisyon girilir ve hata oluşturulur.
![alt text](https://github.com/sdnrelms/hamming-sec-ded-code/blob/main/img/img3.png)
<br>

- Tek bitlik hata ise düzeltilir.
![alt text](https://github.com/sdnrelms/hamming-sec-ded-code/blob/main/img/img4.png)
<br>

- Çift bitlik hata ise uyarı verilir.
![alt text](https://github.com/sdnrelms/hamming-sec-ded-code/blob/main/img/img5.png)


## 🎥 Demo Videosu
- YouTube'da izlemek için: [Demo Videosu](https://youtu.be/z6vql8N5O7w)


## ✏️ Nasıl Çalıştırılır?

- Local'de kullanmak için:

1. Bu repoyu klonlayın:
   ```bash
   git clone https://github.com/sdnrelms/hamming-sec-ded-code.git
   ```
2. Klasöre gidin:
   ```bash
   cd hamming-sec-ded-code
   ```
3. `index.html` dosyasını çift tıklayarak tarayıcıda açın.
<br>

- Web üzerinden denemek isterseniz: 👉 [Simülatör linki](https://sdnrelms.github.io/hamming-sec-ded-code/)



## 📂 Dosya Yapısı

```
hamming-sec-ded-code/
│
├── index.html        # Ana HTML sayfası
├── script.js         # Tüm algoritmalar burada
├── styles.css        # Sayfa tasarımı
├── README.md         # Bu döküman
└── img/              # Ekran görüntüleri
```


