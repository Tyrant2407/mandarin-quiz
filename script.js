const questionContainer = document.getElementById('question-container');
const questionTextElement = document.getElementById('question-text');
const answerButtonsElement = document.getElementById('answer-buttons');
const feedbackTextElement = document.getElementById('feedback-text');
const nextButton = document.getElementById('next-button');
const scoreContainer = document.getElementById('score-container');
const scoreElement = document.getElementById('score');
const totalQuestionsElement = document.getElementById('total-questions');
const restartButton = document.getElementById('restart-button');

let currentQuestionIndex = 0;
let score = 0;
let questions = []; // Akan diisi dengan 90 soal

// DATA SOAL (90 SOAL)
// Format: { question: "Teks Soal", options: ["a", "b", "c", "d"], answerIndex: index_jawaban_benar }
// answerIndex adalah 0 untuk pilihan a, 1 untuk b, 2 untuk c, 3 untuk d.

questions = [
    { question: "1. Apa arti dari kata \"Wǒ men (我们)\" dalam bahasa Indonesia?", options: ["Saya", "Kamu", "Kami", "Mereka"], answerIndex: 2 },
    { question: "2. Bagaimana penulisan Hanzi dari kata \"kalian\"?", options: ["我们", "你好", "他", "你们"], answerIndex: 3 },
    { question: "3. \"Guì xìng (贵姓)\" digunakan untuk menanyakan...", options: ["Nama lengkap", "Marga apa", "Usia", "Pekerjaan"], answerIndex: 1 },
    { question: "4. Apa perbedaan antara \"Ni (你)\" dan \"Nín (您)\"?", options: ["\"Ni\" artinya dia, \"Nín\" artinya kamu", "\"Ni\" artinya anda (lebih sopan), \"Nín\" artinya kamu", "\"Ni\" artinya kamu, \"Nín\" artinya anda (lebih sopan)", "Tidak ada perbedaan"], answerIndex: 2 },
    { question: "5. Bagaimana respon yang tepat untuk \"Duì bu qǐ\"?", options: ["Xiè xiè", "Zàijiàn", "Méi guān xi", "Bù kè qì"], answerIndex: 2 },
    { question: "6. Salam formal untuk \"Selamat pagi\" dalam bahasa Mandarin adalah...", options: ["Wǎn shàng hǎo", "Xiàwǔ hǎo", "Nǐ hǎo", "Zǎo shàng hǎo!"], answerIndex: 3 },
    { question: "7. Pilih ungkapan yang digunakan untuk mengucapkan \"Selamat siang\":", options: ["Zǎo shàng hǎo", "Zhōng wǔ hǎo!", "Wǎn shàng hǎo", "Xiè xiè"], answerIndex: 1 },
    { question: "8. Apa arti dari kalimat \"nǐ hǎo ma? (你好吗?)\" dalam bahasa Indonesia?", options: ["Siapa namamu?", "Apa kabar?", "Terima kasih", "Selamat tinggal"], answerIndex: 1 },
    { question: "9. Bagaimana menjawab \"Nǐ hǎo ma?\" jika kamu baik-baik saja?", options: ["Wǒ bù hǎo", "Wǒ hěn hǎo", "Nǐ ne?", "Duì bu qǐ"], answerIndex: 1 },
    { question: "10. Kalimat mana yang berarti \"Saya baik-baik saja, terima kasih\" dalam Mandarin?", options: ["Wǒ hěn hǎo, zàijiàn", "Wǒ bù hǎo, xiè xiè", "Wǒ hěn hǎo, xiè xiè", "Nǐ hǎo ma, xiè xiè"], answerIndex: 2 },
    { question: "11. Manakah terjemahan yang tepat untuk kalimat \"我不是留学生。\" (wǒ bùshì liúxuéshēng)?", options: ["Saya seorang mahasiswa asing", "Dia bukan mahasiswa asing", "Saya bukan mahasiswa asing", "Kamu adalah mahasiswa asing"], answerIndex: 2 },
    { question: "12. Apa arti kalimat \"我是老师。\" (wǒ shì lǎoshī)?", options: ["Saya seorang siswa", "Saya seorang guru", "Dia seorang guru", "Kamu adalah guru"], answerIndex: 1 },
    { question: "13. Terjemahkan kalimat \"他不是中国人。 (Tā bú shì Zhōngguó rén)\"", options: ["Dia orang Tiongkok", "Saya bukan orang Tiongkok", "Dia bukan orang Tiongkok", "Kamu bukan orang Tiongkok"], answerIndex: 2 },
    { question: "14. Perhatikan percakapan berikut: 大卫:您是老师吗? Dà wèi: nín shì lǎoshī ma? 李军:不是,我不是老师,我是学生。她是老师。 Lǐ jūn: bùshì, wǒ bùshì lǎoshī, wǒ shì xuéshēng. Tā shì lǎoshī. Apa profesi Li Jun berdasarkan percakapan di atas?", options: ["Guru", "Mahasiswa", "Dokter", "Tidak disebutkan"], answerIndex: 1 },
    { question: "15. Perhatikan percakapan berikut: 大卫:您是老师吗? Dà wèi: nín shì lǎoshī ma? 李军:不是,我不是老师,我是学生。她是老师。 Lǐ jūn: bùshì, wǒ bùshì lǎoshī, wǒ shì xuéshēng. Tā shì lǎoshī. Kalimat mana yang menunjukkan bahwa Li Jun adalah seorang siswa?", options: ["Nín shì lǎoshī ma?", "Wǒ bùshì lǎoshī", "Tā shì lǎoshī", "Wǒ shì xuéshēng"], answerIndex: 3 },
    { question: "16. Apa arti dari ekspresi \"不客气 Bù kè qì\" dalam Bahasa Indonesia?", options: ["Terima kasih", "Maaf", "Sama-sama", "Selamat datang"], answerIndex: 2 },
    { question: "17. Jika seseorang mengatakan \"谢谢\", bagaimana cara merespons dengan sopan?", options: ["Nǐ hǎo", "Duì bu qǐ", "不客气 Bù kè qì", "Zàijiàn"], answerIndex: 2 },
    { question: "18. Apa arti dari kalimat \"谢谢你\" dalam bahasa Indonesia?", options: ["Maafkan saya", "Terima kasih", "Apa kabar", "Selamat tinggal"], answerIndex: 1 },
    { question: "19. Apa pinyin dari 汉语 (bahasa Mandarin)?", options: ["Zhōngwén", "Pǔtōnghuà", "Hànyǔ", "Guóyǔ"], answerIndex: 2 },
    { question: "20. Apa pinyin dari 中国 (Negara Tiongkok)?", options: ["Rìběn", "Hánguó", "Měiguó", "Zhōngguó"], answerIndex: 3 },
    { question: "21. Apa pinyin dari kata \"Bahasa Inggris\" dalam bahasa Mandarin?", options: ["Fǎyǔ", "Déyǔ", "Yīngyǔ", "Xībānyáyǔ"], answerIndex: 2 },
    { question: "22. Kata \"人\" (rén) dalam bahasa Mandarin berarti:", options: ["Besar", "Kecil", "Orang", "Api"], answerIndex: 2 },
    { question: "23. Apa arti dari kata \"学生\" (xuéshēng)?", options: ["Guru", "Siswa", "Sekolah", "Belajar"], answerIndex: 1 },
    { question: "24. Kata \"老师\" (lǎoshī) berarti:", options: ["Siswa", "Dokter", "Guru", "Teman"], answerIndex: 2 },
    { question: "25. \"wǒ hěn gāoxìng rènshi nǐmen\" berarti:", options: ["Saya tidak senang bertemu denganmu", "Senang bertemu dengan Anda", "Saya sangat senang mengenal kalian", "Dia sangat senang mengenal kamu"], answerIndex: 2 },
    { question: "26. Apa arti dari kalimat \"rènshi nǐ wǒ yě hěn gāoxìng\"?", options: ["Saya tidak senang mengenalmu", "Saya juga senang mengenalmu", "Kamu juga senang mengenalku", "Kami juga senang mengenal mereka"], answerIndex: 1 },
    { question: "27. Kalimat mana yang artinya \"senang bertemu dengan Anda\"?", options: ["Nǐ hǎo ma?", "Wǒ hěn hǎo", "Hěn gāoxìng rènshi nín", "Xiè xiè nǐ"], answerIndex: 2 },
    { question: "28. Jika kamu berasal dari Indonesia, bagaimana kamu menjawab:\"你是哪国人? nǐ shì nǎ guó rén?\"", options: ["wǒ shì Měiguó rén", "wǒ shì Yìní rén.", "wǒ shì Zhōngguó rén", "wǒ shì Rìběn rén"], answerIndex: 1 },
    { question: "29. Jika seseorang berasal dari Jepang, jawaban yang tepat adalah...", options: ["wǒ shì Hánguó rén", "wǒ shì Yìndù rén", "wǒ shì Rìběn rén", "wǒ shì Tàiguó rén"], answerIndex: 2 },
    { question: "30. \"nǎ guó rén\" berarti...", options: ["Siapa namamu", "Berapa usiamu", "Dari negara mana", "Apa pekerjaanmu"], answerIndex: 2 },
    { question: "31. Apa arti dari angka Mandarin \"三十\" (sān shí)?", options: ["3", "13", "30", "300"], answerIndex: 2 },
    { question: "32. Apa arti dari \"四十\" (sì shí)?", options: ["4", "14", "40", "400"], answerIndex: 2 },
    { question: "33. \"七十\" (qī shí) dalam bahasa Indonesia adalah:", options: ["7", "17", "70", "700"], answerIndex: 2 },
    { question: "34. Bagaimana cara menulis angka 58 dalam bahasa Mandarin?", options: ["五八 (wǔ bā)", "五十 八 (wǔ shí bā)", "八十五 (bā shí wǔ)", "五百八 (wǔ bǎi bā)"], answerIndex: 1 },
    { question: "35. Bagaimana menulis angka 73 dalam Mandarin?", options: ["七三", "三十七", "七十三", "七百三"], answerIndex: 2 },
    { question: "36. Angka 86 dalam Mandarin adalah...", options: ["八六", "六十八", "八十六", "八百六"], answerIndex: 2 },
    { question: "37. Apa arti dari angka Mandarin \"九十六\" (jiǔ shí liù)?", options: ["69", "906", "96", "196"], answerIndex: 2 },
    { question: "38. Apa arti dari \"二十四\" (èr shí sì)?", options: ["204", "42", "24", "240"], answerIndex: 2 },
    { question: "39. Terjemahan dari \"六十五\" (liù shí wǔ) adalah...", options: ["56", "605", "165", "65"], answerIndex: 3 },
    { question: "40. Apa arti dari \"今天是星期三\" (jīntiān shì xīngqī sān)?", options: ["Hari ini hari Senin", "Besok hari Rabu", "Hari ini hari Rabu", "Kemarin hari Rabu"], answerIndex: 2 },
    { question: "41. \"星期五\"(xīngqī wǔ) adalah hari apa dalam bahasa Indonesia?", options: ["Senin", "Rabu", "Jumat", "Sabtu"], answerIndex: 2 },
    { question: "42. Apa arti dari \"明天是星期一\"(míngtiān shì xīngqī yī)?", options: ["Besok hari Minggu", "Besok hari Senin", "Hari ini hari Senin", "Kemarin hari Senin"], answerIndex: 1 },
    { question: "43. Bagaimana cara mengatakan \"bulan Februari\" dalam bahasa Mandarin?", options: ["一月 (yī yuè)", "二月 (èr yuè)", "三月 (sān yuè)", "十二月 (shí'èr yuè)"], answerIndex: 1 },
    { question: "44. \"十月\" (shí yuè) dalam bahasa Indonesia adalah bulan...", options: ["September", "Oktober", "November", "Desember"], answerIndex: 1 },
    { question: "45. Apa arti dari \"六月\" (liù yuè)?", options: ["April", "Mei", "Juni", "Juli"], answerIndex: 2 },
    { question: "46. Apa arti dari \"五月五号\" (wǔ yuè wǔ hào)?", options: ["5 April", "5 Mei", "15 Mei", "Mei tanggal 25"], answerIndex: 1 },
    { question: "47. \"三月二十号\" berarti tanggal...", options: ["3 Maret", "13 Maret", "20 Maret", "Maret tanggal 23"], answerIndex: 2 },
    { question: "48. Terjemahan dari \"十二月三十一号\" adalah...", options: ["12 Desember", "21 Desember", "31 Desember", "Desember tanggal 13"], answerIndex: 2 },
    { question: "49. Bagaimana cara menyebutkan tahun 2025 dalam bahasa Mandarin?", options: ["两千二十五", "二零二五", "二千二百五十", "零二五二"], answerIndex: 1 },
    { question: "50. Bagaimana cara menyebutkan tahun 1998 dalam bahasa Mandarin?", options: ["一千九百九十八", "一九九八", "九八一九", "一九八九"], answerIndex: 1 },
    { question: "51. Bagaimana cara mengatakan tahun 2010 dalam bahasa Mandarin?", options: ["两千一十", "二零一零", "二千零一十", "一零二零"], answerIndex: 1 },
    { question: "52. Bagaimana cara menyebutkan nomor \"862-437-5901\" dalam bahasa Mandarin?", options: ["八六二 四三七 五九一零", "八百六十二 四百三十七 五千九百零一", "八六二四三七五九零一", "捌陆贰肆叁柒伍玖零壹"], answerIndex: 2 },
    { question: "53. Bagaimana cara mengatakan nomor \"310-528-7642\" dalam bahasa Mandarin?", options: ["三百一十 五百二十八 七千六百四十二", "三一零 五二八 七六四二", "三幺零 五二八 七六四二", "叁壹零伍贰捌柒陆肆贰"], answerIndex: 1 },
    { question: "54. Cara menyebutkan nomor \"129-745-3068\" dalam Mandarin adalah...", options: ["一百二十九 七百四十五 三千零六十八", "一二九 七四五 三零六八", "幺二九 七四五 三洞六八", "壹贰玖柒肆伍叁零陆捌"], answerIndex: 1 },
    { question: "55. Apa arti dari \"早上六点半\" (zǎoshang liù diǎn bàn)?", options: ["Pukul enam pagi", "Pukul setengah enam pagi", "Pukul enam pagi lebih setengah jam", "Pukul enam sore lebih setengah jam"], answerIndex: 2 },
    { question: "56. Apa arti dari \"晚上十点半\" wǎnshàng...? (Diasumsikan \"晚上十点半\" wǎnshàng shí diǎn bàn)", options: ["Pukul sepuluh malam", "Pukul setengah sepuluh malam", "Pukul 10 malam lewat 30 menit", "Pukul sepuluh pagi lewat 30 menit"], answerIndex: 2 },
    { question: "57. \"早上七点\" zǎoshang....berarti... (Diasumsikan \"早上七点\" zǎoshang qī diǎn)", options: ["Jam 7 malam", "Jam setengah tujuh pagi", "Jam 7 pagi", "Jam 7 lebih 15 menit pagi"], answerIndex: 2 },
    { question: "58. Bagaimana cara mengatakan \"pukul empat sore\" dalam bahasa Mandarin?", options: ["早上四点 (zǎoshang sì diǎn)", "下午四点 (xiàwǔ sì diǎn)", "晚上四点 (wǎnshàng sì diǎn)", "四点钟 (sì diǎn zhōng)"], answerIndex: 1 },
    { question: "59. Apa arti dari \"现在是下午三点\" (xiànzài shì xiàwǔ sān diǎn)?", options: ["Sekarang jam tiga pagi", "Dulu jam tiga sore", "Sekarang jam tiga sore", "Nanti jam tiga sore"], answerIndex: 2 },
    { question: "60. Bagaimana cara mengatakan \"pukul dua seperempat/15 menit\" (2:15) dalam bahasa Mandarin?", options: ["两点十五分 (liǎng diǎn shíwǔ fēn)", "两点一刻 (liǎng diǎn yī kè)", "两点三刻 (liǎng diǎn sān kè)", "两点半 (liǎng diǎn bàn)"], answerIndex: 1 },
    { question: "61. \"五点三刻\" berarti...", options: ["Pukul 5:30", "Pukul 5:45", "Pukul 5:15", "Pukul 3:05"], answerIndex: 2 }, // Sesuai PDF
    { question: "62. Apa arti dari \"我早上六点一刻起床\" (wǒ zǎoshang liù diǎn yī kè qǐchuáng)?", options: ["Saya bangun tidur pada pukul enam pagi", "Saya bangun tidur pada pukul enam lebih seperempat pagi", "Saya tidur pada pukul enam lebih seperempat pagi", "Saya bangun tidur pada pukul seperempat menuju enam pagi"], answerIndex: 1 },
    { question: "63. Apa arti dari \"我晚上七点半吃晚饭\" (wǒ wǎnshàng qī diǎn bàn chī wǎnfàn)?", options: ["Saya makan malam jam tujuh", "Saya makan malam jam setengah tujuh", "Saya makan malam jam tujuh lewat 30 menit", "Saya makan pagi jam tujuh lewat 30 menit"], answerIndex: 2 },
    { question: "64. \"我中午十二点吃午饭 Wǒ zhōngwǔ shí'èr diǎn chī wǔfàn\" artinya...", options: ["Saya makan siang jam 10 pagi", "Saya makan siang jam 12 siang", "Saya makan malam jam 12 malam", "Saya makan siang jam 2 siang"], answerIndex: 1 },
    { question: "65. Arti dari \"我早上七点吃早饭\" Wǒ zǎoshang qī diǎn chī zǎofàn?", options: ["Saya makan pagi jam 7 malam", "Saya makan siang jam 7 pagi", "Saya makan pagi jam 7 pagi", "Saya tidak makan pagi jam 7"], answerIndex: 2 },
    { question: "66. Apa arti dari \"我下午三点下课\" (wǒ xiàwǔ sān diǎn xià kè)?", options: ["Saya mulai kelas jam tiga sore", "Saya selesai kelas jam tiga sore", "Saya selesai kelas jam tiga pagi", "Saya ada kelas jam tiga sore"], answerIndex: 1 },
    { question: "67. Apa arti dari \"十块五毛 - shí kuài wǔ máo\"?", options: ["Sepuluh yuan lima mao", "Seratus yuan lima mao", "Sepuluh yuan lima puluh mao", "Lima yuan sepuluh mao"], answerIndex: 2 }, // Sesuai PDF
    { question: "68. Bagaimana mengatakan \"12 yuan 5 mao\" dalam bahasa Mandarin?", options: ["十二块五 (shí'èr kuài wǔ)", "一二块五毛 (yī'èr kuài wǔmáo)", "十二块五毛 (shí'èr kuài wǔmáo)", "五毛十二块 (wǔmáo shí'èr kuài)"], answerIndex: 2 },
    { question: "69. Apa yang dimaksud dengan \"七十块三毛 - qī shí kuài sān máo\"?", options: ["Tujuh yuan tiga mao", "Tujuh puluh tiga yuan", "Tujuh puluh yuan tiga mao", "Tiga yuan tujuh puluh mao"], answerIndex: 2 },
    { question: "70. Apa arti dari \"五十块五毛 - wǔ shí kuài wǔ máo\"?", options: ["Lima yuan lima mao", "Lima puluh lima yuan", "Lima puluh yuan lima mao", "Lima yuan lima puluh mao"], answerIndex: 2 },
    { question: "71. Apa arti dari \"二十块九毛 - èr shí kuài jiǔ máo\"?", options: ["Dua yuan sembilan mao", "Dua puluh sembilan yuan", "Dua puluh yuan sembilan mao", "Sembilan yuan dua puluh mao"], answerIndex: 2 },
    { question: "72. Bagaimana cara menyebutkan ¥ 100 dalam bahasa Mandarin?", options: ["一千块 (yī qiān kuài)", "一百块 - yī bǎi kuài", "十百块 (shí bǎi kuài)", "一百元 (yī bǎi yuán)"], answerIndex: 1 },
    { question: "73. Bagaimana mengatakan ¥150 dalam bahasa Mandarin?", options: ["一百五块 (yī bǎi wǔ kuài)", "一百五十块 - yī bǎi wǔ shí kuài", "一千五十块 (yī qiān wǔ shí kuài)", "十五百块 (shíwǔ bǎi kuài)"], answerIndex: 1 },
    { question: "74. Bagaimana cara menyebutkan ¥80 dalam bahasa Mandarin?", options: ["八百块 (bā bǎi kuài)", "十八块 (shí bā kuài)", "八十块 - bā shí kuài", "八零块 (bā líng kuài)"], answerIndex: 2 },
    { question: "75. Apa arti dari \"四十五块六毛七分 - sì shí wǔ kuài liù máo qī fēn\"?", options: ["Empat puluh lima yuan enam puluh tujuh fen", "Empat ratus lima yuan enam mao tujuh fen", "Empat puluh lima yuan enam mao tujuh fen", "Empat lima enam tujuh"], answerIndex: 2 },
    { question: "76. Apa arti dari \"三十块七毛九分\"? Sānshí kuài qī máo jiǔ fēn", options: ["Tiga puluh yuan tujuh puluh sembilan fen", "Tiga ratus yuan tujuh mao sembilan fen", "Tiga puluh yuan tujuh mao sembilan fen", "Tiga puluh tujuh sembilan"], answerIndex: 2 },
    { question: "77. Apa arti dari kalimat \"你好! 你要买什么?\" (Nǐ hǎo! Nǐ yào mǎi shénme?)", options: ["Halo! Kamu dari mana?", "Halo! Siapa namamu?", "Halo! Apa yang ingin kamu beli?", "Halo! Mau minum apa?"], answerIndex: 2 },
    { question: "78. \"你买什么 Nǐ mǎi shénme?\" artinya...", options: ["Kamu jual apa?", "Apa yang kamu beli?", "Kamu mau apa?", "Ini apa?"], answerIndex: 1 },
    { question: "79. Apa arti dari kalimat \"多少钱一斤?\" (Duō shǎo qián yī jìn)?", options: ["Berapa harga per buah?", "Berapa harga per 500 gram?", "Berapa harga per kilogram?", "Ini berapa totalnya?"], answerIndex: 2 }, // Sesuai PDF
    { question: "80. Apa arti dari \"这个多少钱 Zhège duōshǎo qián??\" artinya...", options: ["Yang itu berapa harganya?", "Ini harganya berapa?", "Kamu punya uang berapa?", "Ini apa?"], answerIndex: 1 },
    { question: "81. Apa arti dari \"一斤多少钱? Yī jīn duōshǎo qián\"", options: ["Satu kilogram berapa?", "Setengah lusin berapa?", "Setengah kilogram berapa?", "Satu buah berapa?"], answerIndex: 2 },
    { question: "82. Apa arti dari kalimat \"太贵了。便宜一点儿,行吗? (Tài guì le. Pián yí yī diǎn er, xíng ma)?\"", options: ["Sangat murah. Bisa lebih mahal sedikit, boleh kah?", "Harganya pas. Tidak bisa kurang lagi.", "Harganya sangat mahal. Bisa lebih murah sedikit, boleh kah?", "Ini tidak dijual."], answerIndex: 2 },
    { question: "83. Arti dari \"这个太贵了!\"\"Zhège tài guìle!\" adalah...", options: ["Ini terlalu murah!", "Ini harganya pas!", "Ini terlalu mahal!", "Ini bagus sekali!"], answerIndex: 2 },
    { question: "84. Apa arti dari kalimat \"一共多少钱?\" (Yī gòng duō shǎo qián)?", options: ["Satunya berapa harganya?", "Berapa harga total?", "Kamu punya uang berapa?", "Berapa banyak barangnya?"], answerIndex: 1 },
    { question: "85. Bagaimana cara menyebutkan \"8 kuai\" dalam bahasa Mandarin?", options: ["Shí bā kuài", "Bā shí kuài", "Bā kuài", "Líng bā kuài"], answerIndex: 2 },
    { question: "86. Cara mengatakan \"6 kuai\" dalam Mandarin adalah...", options: ["Shí liù kuài", "Liù shí kuài", "Liù kuài", "Líng liù kuài"], answerIndex: 2 },
    { question: "87. Cara mengatakan \"10 kuai\" adalah...", options: ["Yī kuài", "Líng shí kuài", "Shí kuài", "Yī líng kuài"], answerIndex: 2 },
    { question: "88. Apa yang dimaksud dengan kata \"一斤\" (yī jīn) dalam percakapan tersebut?", options: ["100 gram", "250 gram", "500 gram", "1 kilogram"], answerIndex: 2 },
    { question: "89. Apa arti dari \"两斤\"?", options: ["200 gram", "500 gram", "1 kilogram", "2 kilogram"], answerIndex: 2 },
    { question: "90. Apa arti dari \"苹果\" (píng guǒ)?", options: ["Jeruk", "Pisang", "Apel", "Mangga"], answerIndex: 2 }
];

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreContainer.classList.add('hide');
    questionContainer.classList.remove('hide');
    nextButton.classList.remove('hide');
    nextButton.innerText = 'Soal Berikutnya';
    feedbackTextElement.innerText = '';
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionTextElement.innerText = currentQuestion.question;
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('btn');
        button.dataset.index = index;
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    nextButton.classList.add('hide'); // Sembunyikan tombol next sampai jawaban dipilih
    feedbackTextElement.innerText = '';
     // Kembalikan event listener default untuk tombol next
    nextButton.removeEventListener('click', showNextQuestion); // Hapus listener lama jika ada
    nextButton.addEventListener('click', showNextQuestion);
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const selectedAnswerIndex = parseInt(selectedButton.dataset.index);
    const correctAnswerIndex = questions[currentQuestionIndex].answerIndex;

    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true; // Nonaktifkan semua tombol setelah jawaban dipilih
        const buttonIndex = parseInt(button.dataset.index);
        if (buttonIndex === correctAnswerIndex) {
            button.classList.add('correct');
        } else if (buttonIndex === selectedAnswerIndex) {
            button.classList.add('wrong');
        }
    });

    if (selectedAnswerIndex === correctAnswerIndex) {
        score++;
        feedbackTextElement.innerText = 'Jawaban Benar!';
        feedbackTextElement.style.color = '#28a745';
    } else {
        feedbackTextElement.innerText = `Jawaban Salah. Yang benar: ${questions[currentQuestionIndex].options[correctAnswerIndex]}`;
        feedbackTextElement.style.color = '#dc3545';
    }

    if (questions.length > currentQuestionIndex + 1) {
        nextButton.innerText = 'Soal Berikutnya';
        nextButton.classList.remove('hide');
    } else {
        nextButton.innerText = 'Lihat Skor';
        nextButton.classList.remove('hide');
        nextButton.removeEventListener('click', showNextQuestion); // Hapus listener untuk soal berikutnya
        nextButton.addEventListener('click', showScore); // Tambah listener untuk tampilkan skor
    }
}

function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    // Jika ini adalah listener terakhir yang seharusnya menuju showScore,
    // logika di selectAnswer akan mengganti listener-nya.
}


function showScore() {
    questionContainer.classList.add('hide');
    nextButton.classList.add('hide');
    feedbackTextElement.innerText = '';
    scoreContainer.classList.remove('hide');
    scoreElement.innerText = score;
    totalQuestionsElement.innerText = questions.length;
}

restartButton.addEventListener('click', startQuiz);

// Mulai kuis saat halaman dimuat
startQuiz();