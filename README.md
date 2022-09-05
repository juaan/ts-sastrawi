# js-sastrawi

js-sastrawi is a javascript package for doing stemming in Indonesian language written using typescript. It is based from [Sastrawi](https://github.com/sastrawi/sastrawi) for PHP by [Andy Librian](https://github.com/andylibrian).

js-sastrawi adalah package javascript untuk melakukan _stemming_ pada bahasa Indonesia yang ditulis menggunakan typescript. Dikembangkan dari [Sastrawi](https://github.com/sastrawi/sastrawi) untuk PHP yang dibuat oleh [Andy Librian](https://github.com/andylibrian).

## Stemming

Dari [Wikipedia](https://en.wikipedia.org/wiki/Stemming), _stemming_ adalah proses untuk mengubah kata berimbuhan menjadi kata dasar. Contohnya :

- menahan => tahan
- pewarna => warna

## Contoh Penggunaan

Penggunaan yang paling sederhana adalah dengan menggunakan kamus kata dasar default yang telah disediakan :

```javascript
import stemmer from "js-sastrawi";

const defaultDictionary = sastrawi.defaultDictionary();
const stemmer = new sastrawi.Stemmer(defaultDictionary);
console.log(stemmer.stem("menyukai")); // suka
```

Selain menggunakan kamus kata dasar default, user juga dapat membuat kamus kata dasar sendiri :

```javascript
import stemmer from "js-sastrawi";

const dictionaryCustom = new sastrawi.Dictionary(["aku", "ingin", "tahu"]);
dictionaryCustom.add("gaul");
console.log(dictionaryCustom.count()); // 3

const stemmer = sastrawi.NewStemmer(dictionaryCustom);
const sentence = "aku ingin mengetahui";
const tokenizeWord = stemmer.tokenize(sentence);

tokenizeWord.forEach((word) => {
  console.log(`${word} => ${stemmer.stem(word)}`);
});
```

## Pustaka

#### Algoritma

1. Algoritma Nazief dan Adriani
2. Asian J. 2007. **_Effective Techniques for Indonesian Text Retrieval_**. PhD thesis School of Computer Science and Information Technology RMIT University Australia. ([PDF](http://researchbank.rmit.edu.au/eserv/rmit:6312/Asian.pdf) dan [Amazon](https://www.amazon.com/Effective-Techniques-Indonesian-Text-Retrieval/dp/3639021649))
3. Arifin, A.Z., I.P.A.K. Mahendra dan H.T. Ciptaningtyas. 2009. **_Enhanced Confix Stripping Stemmer and Ants Algorithm for Classifying News Document in Indonesian Language_**, Proceeding of International Conference on Information & Communication Technology and Systems (ICTS). ([PDF](http://personal.its.ac.id/files/pub/2623-agusza-baru%2021%20d%20VIP%20enhanced-confix-stripping-stem.pdf))
4. A. D. Tahitoe, D. Purwitasari. 2010. **_Implementasi Modifikasi Enhanced Confix Stripping Stemmer Untuk Bahasa Indonesia dengan Metode Corpus Based Stemming_**, Institut Teknologi Sepuluh Nopember (ITS) – Surabaya, 60111, Indonesia. ([PDF](http://digilib.its.ac.id/public/ITS-Undergraduate-14255-paperpdf.pdf))
5. Tambahan aturan _stemming_ dari [kontributor Sastrawi](https://github.com/sastrawi/sastrawi/graphs/contributors).

#### Kamus Kata Dasar

Proses stemming oleh Sastrawi sangat bergantung pada kamus kata dasar. Sastrawi menggunakan kamus kata dasar dari [kateglo.com](http://kateglo.com) dengan sedikit perubahan.

## Lisensi

Sebagaimana [Sastrawi](https://github.com/sastrawi/sastrawi) untuk PHP, js-astrawi juga disebarkan dengan lisensi [MIT](http://choosealicense.com/licenses/mit/). Untuk lisensi kamus kata dasar dari Kateglo adalah [CC-BY-NC-SA 3.0](https://github.com/ivanlanin/kateglo#lisensi-isi).

## Di Bahasa Pemrograman Lain

- [Sastrawi](https://github.com/sastrawi/sastrawi) - PHP
- [JSastrawi](https://github.com/jsastrawi/jsastrawi) - Java
- [cSastrawi](https://github.com/mohangk/c_sastrawi) - C
- [PySastrawi](https://github.com/har07/PySastrawi) - Python
- [Sastrawi-Ruby](https://github.com/meisyal/sastrawi-ruby) - Ruby
- [Go-Sastrawi](https://github.com/RadhiFadlillah/go-sastrawi) - Go
