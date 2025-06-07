let originalCode = []; //girilen veriye gore oluşturulan orjinal hamming kodu
let currentCode = []; //bellekten okunan, hata oluşturulmus veya duzeltilmis hamming kodu
let errorPositions = []; // Son hata oluşturulan pozisyonları tutar
let overallParityBit = 0;   //genel parite bitinin degeri

//2nin kuvveti mi kontrolunu yapan fonk. 
function isPowerOfTwo(n) {
  return (n & (n - 1)) === 0;
}

//hamming code oluşturan fonk.
function createSecDed() {
  //girilen veriyi ve uzunlugunu al
  const bitLength = parseInt(document.getElementById("bitLength").value);
  const input = document.getElementById("dataInput").value.trim();

  //girilen veri sadece 0 ve 1 içermeli ve uzunlugu bitlenght olmalı, degilse alertle uyar
  if (!/^[01]+$/.test(input) || input.length !== bitLength) {
    alert("Lütfen " + bitLength + " bitlik sadece 0 ve 1 içeren veri girin.");
    return;
  }

  //veri bitlerini sayıya cevir
  const dataBits = input.split("").map((bit) => parseInt(bit));

  //parite bit sayısı hesapla
  // 2^r >= m + r + 1 (parite bit sayısı bu denklemi sağlamalı)
  let parity_number = 0;
  while (Math.pow(2, parity_number) < dataBits.length + parity_number + 1)
    parity_number++;

  const totalBits = dataBits.length + parity_number;

  //hamming dizi oluşturma
  let hamming = Array(totalBits + 1).fill(0);
  for (let i = 1, j = 0; i <= totalBits; i++) {
    if (!isPowerOfTwo(i)) {
      //2nin kuvveti olmayan yerlere veri bitleri koyulur, kuvveti olanlar bos bırakılır
      hamming[i] = dataBits[j++];
    }
  }

  //parite bitleri hesabı
  //her parite bitinin değeri için ilgili bitlerle XOR
  for (let i = 0; i < parity_number; i++) {
    const parityPos = Math.pow(2, i);
    let parity = 0;
    for (let j = 1; j <= totalBits; j++) {
      if ((j & parityPos) !== 0) {
        parity ^= hamming[j];
      }
    }
    hamming[parityPos] = parity;
  }

  //Genel parite hesabı
  //çift hatayı tespit için tum koddaki bitlerin XORu alınır
  let totalParity = hamming.slice(1).reduce((a, b) => a ^ b, 0);
  hamming.push(totalParity);
  overallParityBit = totalParity;

  //kopyalari global degiskenlere ata
  currentCode = [...hamming];
  originalCode = [...hamming];

  //sonucları yazdırma
  show_output(
    hamming, 
    "originalOutput", 
    "Oluşturulan Orijinal Kod:"
  );
  show_output(
    hamming,
    "hammingOutput",
    "Belleğe yazılan kod (Henüz hata yok):"
  );
  document.getElementById("correctOutput").textContent = "";
  errorPositions = [];
}


//hata oluşturma fonk.
function addError() {
  //değişiklik yapılacak poslar alınır ve sayıya cevrilir
  const positions = document
    .getElementById("errorBits")
    .value.split(",")
    .map((p) => parseInt(p));

  //gecerli bir bit mi kontrol edilir
  for (let pos of positions) {
    if (pos <= 0 || pos >= currentCode.length) {
      alert(
        "Geçerli bit pozisyonu girin (1 - " + (currentCode.length - 1) + ")"
      );
      return;
    }
    //ve 0-1 1-0 yapılır
    currentCode[pos] ^= 1;
  }
  errorPositions = positions; //bu pozisyonları globalde tut
  //bozulmus kodu goster
  show_output(
    currentCode,
    "hammingOutput",
    `Hata oluşturuldu. Bellekteki bozulmuş kod:`,
    errorPositions //tutulan pozisyonları gönder(renklendirme için)
  );
}

//hata tespiti ve duzeltme fonk.
function detectAndFix() {
  //parite biti sayısı belirle
  const parity_number_to_check = Math.ceil(Math.log2(currentCode.length - 1));
  let syndrome = 0; //hatalı bitin yer bilgisi

  //her parite biti için ilgili bitlerin XORunu hesapla, hata varsa syndrome'e ekle, syndrome != 0 ise hata var demektir
  for (let i = 0; i < parity_number_to_check; i++) {
    const parityPos = Math.pow(2, i);
    let parity = 0;
    for (let j = 1; j < currentCode.length - 1; j++) {
      if ((j & parityPos) !== 0) {
        parity ^= currentCode[j];
      }
    }
    if (parity !== 0) 
        syndrome += parityPos;
  }

  //genel parite bitini kontrol et - tum bitler XOR'lanır
  const calculatedParity = currentCode
    .slice(1, currentCode.length - 1)
    .reduce((a, b) => a ^ b, 0);
  const overallParityCheck =
    calculatedParity ^ currentCode[currentCode.length - 1];



  //syndrome ve genel parite durumuna gore hata yazdırılır

  // syndrome ve genel parite 0 sa hata yoktur
  if (syndrome === 0 && overallParityCheck === 0) {
    show_output(
      currentCode,
      "correctOutput",
      "✅ Hata bulunamadı. Veri doğru."
    );
    //syndrome sıfır değil ve genel parite 1 se tek bitlik hata vardır
  } else if (syndrome !== 0 && overallParityCheck === 1) {
    currentCode[syndrome] ^= 1;
    errorPositions = [];
    show_output(
      currentCode,
      "correctOutput",
      `⚠️ Tek bitlik hata bulundu ve düzeltildi (Bit ${syndrome}).`
    );
    //syndrome sıfır değil ve genel parite 0 sa çift bitlik hata vardır
  } else if (syndrome !== 0 && overallParityCheck === 0) {
    show_output(
      currentCode,
      "correctOutput",
      `❌ Çift bit hatası tespit edildi. Düzeltilemez.`
    );
    //syndrome sıfır fakat genel parite 1 se genel parite bozulmuş olabilir
  } else if (syndrome === 0 && overallParityCheck === 1) {
    show_output(
      currentCode,
      "correctOutput",
      `⚠️ Genel parite biti hatalı olabilir.`
    );
    // beklenmeyen durum
  } else {
    show_output(currentCode, "correctOutput", `🚫 Tanımsız durum oluştu.`);
  }
}


//sonuc gosterme fonk.
//verilen bit dizisini ve mesajı HTML elementine yazdirir
function show_output(data, elementId, message, positions = []) {
  let display = "";

  // positions dizisindeki değerleri sayısal hale getir
  const numericPositions = positions.map((p) => parseInt(p));

  //1. bitten n-1. bite kadar olanları(genel parite hariç) goster
  for (let i = 1; i < data.length - 1; i++) {
    if (numericPositions.includes(i)) {
      display += `<span style="color:red; font-weight:bold">${data[i]}</span> `;
    } else {
      display += `${data[i]} `;
    }
  }

  //genel parite biti ekle
  display += `(Genel Parite: ${data[data.length - 1]})`;

  //mesaj ve bit dizisini HTML olarak yazdır
  document.getElementById(elementId).innerHTML = `${message}<br>${display}`;
}
