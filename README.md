# 💻 Hamming SEC-DED Kod Simülatörü

## 📌 Proje Özeti
Bu proje, **Hamming SEC-DED (Single Error Correction – Double Error Detection)** algoritmasını temel alan bir **web tabanlı simülatördür**. Kullanıcı, 8, 16 veya 32 bit uzunluğunda veri girerek:

- Hamming kodunu üretebilir,  
- Belleğe yapay hata ekleyebilir,  
- Hataları tespit edip düzeltebilir.

Projede Hamming SEC-DED algoritması JavaScript ile implemente edilmiş, HTML ve CSS ile kullanıcı dostu bir arayüz geliştirilmiştir. Bilgisayar Mimarisi dersi kapsamında dönem projesi olarak hazırlanmıştır.


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

## 🔍 Teknik Detaylar

####  🧠  Hamming SEC-DED Kod Nasıl Çalışır?
Hamming SEC-DED (Single Error Correction - Double Error Detection) algoritması, bellek sistemlerinde veri güvenliğini sağlamak amacıyla kullanılan bir hata düzeltme yöntemidir.
Bu algoritma sayesinde tek bitlik hatalar düzeltilir, çift bitlik hatalar ise tespit edilerek uyarı verilir.

Temel prensipleri:

🔹 Veriye parite bitleri eklenir.

🔹 Her parite biti, belirli pozisyonlardaki verileri denetler (pozisyonlar ikili tabanda analiz edilir).

🔹 Genel parite biti (overall parity) ile çift bit hataları tespit edilir.

🔹 Syndrome analizi ile hata pozisyonu hesaplanır ve tek bitlik hata varsa düzeltilir.


#### 🧮  Hamming Kodu Hesaplama Adımları


###### 1. Parite Bit Sayısını Hesapla

- Aşağıdaki formülde `m` veri biti sayısı, `r` parite biti sayısıdır. Formül, tüm bitlerin sığacağı minimum `r`'yi bulmak için kullanılır.

   - ```2^r ≥ m + r + 1``` 

###### 2. Veri ve Parite Bitlerini Yerleştir

- Pozisyonları 1’den başlayarak sırala.
- 2’nin kuvveti olan pozisyonlara (**1, 2, 4, 8...**) parite bitlerini (P1, P2, P4, ...) yerleştir.
- Diğer pozisyonlara veri bitlerini yerleştir.

###### 3. Parite Bitlerini Hesapla

- Her parite biti, ikili gösterimde belirli bitleri kontrol eder.  
  - **P1**: en sağdaki (1.) bit **1** olan pozisyonlar  
  - **P2**: en sağdan ikinci (2.) bit **1** olan pozisyonlar  
  - **P4**: en sağdan üçüncü (3.) bit **1** olan pozisyonlar  
  - **P8**: en sağdan dördüncü (4.) bit **1** olan pozisyonlar  

###### 4. Genel Parite Bitini Hesapla

- Genel parite biti, tüm bitlerin XOR’lanmasıyla elde edilir.
- Eğer hata tek bitlikse hem genel parite hem syndrome hata verir.
- Ancak çift bitlik bir hata, parite bitleriyle tespit edilemeyebilir; bu durumda yalnızca genel parite hatalı olur ve veri güvenliğinin bozulduğu anlaşılır.



#### 🪄 Hata Denetimi ve Düzeltme

- Alıcı taraf veriyi okur ve parite bitleriyle birlikte **syndrome** değerini hesaplar.  
- Syndrome ve genel parite biti sayesinde hata türü belirlenir:

| Syndrome Değeri | Genel Parite | Açıklama                        |
|-----------------|---------------|---------------------------------|
| = 0             | 0             | ✅ **Hata yok** |
| ≠ 0             | 1             | ⚠️ **Tek bit hatası** (düzeltilebilir) |
| ≠ 0             | 0             | ❌ **Çift bit hatası** (düzeltilemez) |
| = 0             | 1             | ⚠️ **Genel parite hatası** (veri bütünlüğü bozulmuş olabilir) |
