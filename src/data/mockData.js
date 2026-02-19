export const symptoms = [
  {
    id: '1',
    title: 'Memede Kitle veya Sertleşme',
    category: 'Fiziksel',
    severity: 'Yüksek',
    icon: '🔴',
    description:
      'Memede veya koltuk altında hissedilen anormal bir kitle veya sertleşme, meme kanserinin en yaygın belirtilerinden biridir.',
    details:
      'Kitleler genellikle ağrısız olup düzensiz kenarlara sahip olabilir. Meme dokusunun geri kalanından farklı hissettiren herhangi bir değişiklik önemlidir. Kendinizi düzenli olarak muayene edin ve herhangi bir değişikliği hemen doktorunuza bildirin.',
    actions: [
      'Hemen doktora gidin',
      'Kendi kendine meme muayenesi yapın',
      'Mamografi randevusu alın',
    ],
    date: '2024-01-15',
  },
  {
    id: '2',
    title: 'Meme Derisi Değişiklikleri',
    category: 'Fiziksel',
    severity: 'Orta',
    icon: '🟡',
    description:
      'Memede kızarıklık, şişlik, portakal kabuğu görünümü veya büzüşme gibi deri değişiklikleri.',
    details:
      'Derinin görünümündeki değişiklikler inflamatuvar meme kanserinin işareti olabilir. Portakal kabuğu görünümü (peau d\'orange), ısı artışı ve kızarıklık önemli uyarı işaretleridir. Bu tür değişiklikler hızla ilerleyebilir.',
    actions: ['Dermatoloji uzmanına gidin', 'Fotoğraf çekerek takip edin', 'Onkoloji muayenesi yaptırın'],
    date: '2024-01-20',
  },
  {
    id: '3',
    title: 'Meme Başı Değişiklikleri',
    category: 'Fiziksel',
    severity: 'Orta',
    icon: '🟠',
    description:
      'Meme başında içe çöküme, akıntı (özellikle kanlı) veya görünüm değişikliği.',
    details:
      'Meme başı akıntısı, özellikle tek taraflı ve kanlı ise önemli bir uyarı işaretidir. Meme başının içe çökmesi ya da konumunun değişmesi de dikkat edilmesi gereken bir durumdur.',
    actions: [
      'Jinekolog muayenesi yaptırın',
      'Akıntı varsa numune alın',
      'Ultrasonografi yaptırın',
    ],
    date: '2024-01-25',
  },
  {
    id: '4',
    title: 'Yorgunluk ve Halsizlik',
    category: 'Genel',
    severity: 'Düşük',
    icon: '🟢',
    description:
      'Kanser veya tedavi sürecinde yaşanan aşırı yorgunluk ve enerji kaybı.',
    details:
      'Kanserle ilişkili yorgunluk, normal yorgunluktan farklıdır ve dinlenmekle geçmez. Tedavi süreci boyunca yaygın görülen bu belirti, günlük yaşam kalitesini olumsuz etkileyebilir.',
    actions: [
      'Düzenli uyku rutini oluşturun',
      'Hafif egzersiz yapın',
      'Beslenmenizi dengeleyin',
      'Doktorunuza bildirin',
    ],
    date: '2024-02-01',
  },
  {
    id: '5',
    title: 'Kol veya Meme Şişliği',
    category: 'Fiziksel',
    severity: 'Orta',
    icon: '🟠',
    description:
      'Lenf nodları veya lenf kanallarındaki tıkanıklık nedeniyle oluşan şişlik (lenfödem).',
    details:
      'Lenfödem, koltuk altı lenf nodlarının temizlenmesi veya radyasyon tedavisi sonrasında gelişebilir. Kolda ağırlık, gerilme hissi ve ölçü artışı belirtileri arasındadır.',
    actions: [
      'Lenfödem terapisti görüşü alın',
      'Kompresyon giysisi kullanın',
      'Kolu yüksekte tutun',
      'Manuel lenfatik drenaj yaptırın',
    ],
    date: '2024-02-05',
  },
];

export const experts = [
  {
    id: '1',
    name: 'Prof. Dr. Ayşe Kaya',
    specialty: 'Onkoloji',
    hospital: 'Ankara Üniversitesi Tıp Fakültesi',
    experience: '25 yıl',
    rating: 4.9,
    avatar: '👩‍⚕️',
    available: true,
    bio: 'Meme kanseri tedavisinde uzman, 500+ hasta deneyimi',
  },
  {
    id: '2',
    name: 'Doç. Dr. Mehmet Yılmaz',
    specialty: 'Radyasyon Onkolojisi',
    hospital: 'İstanbul Tıp Fakültesi',
    experience: '18 yıl',
    rating: 4.7,
    avatar: '👨‍⚕️',
    available: true,
    bio: 'Radyoterapi ve kemoterapi protokolleri konusunda uzman',
  },
  {
    id: '3',
    name: 'Uzm. Dr. Fatma Demir',
    specialty: 'Psikoonkoloji',
    hospital: 'Hacettepe Üniversitesi',
    experience: '12 yıl',
    rating: 4.8,
    avatar: '👩‍⚕️',
    available: false,
    bio: 'Kanser hastalarının psikolojik desteği konusunda uzman',
  },
];

export const patientExperiences = [
  {
    id: '1',
    name: 'Zeynep K.',
    age: 42,
    stage: 'Evre II',
    date: '2024-01-10',
    avatar: '🌸',
    title: 'Umut her zaman var',
    summary: 'Tanı aldıktan sonra en zor dönemimi atlattım ama bugün iyiyim...',
    content:
      'Meme kanseri tanısını aldığımda dünyam başıma yıkıldı. İki çocuk annesi olarak bu haberi almak çok zordu. Ancak doktorlarımın desteği ve ailem sayesinde tedavi sürecimi başarıyla tamamladım. Kemoterapi döneminde saçlarımı kaybettim ama en önemlisini, hayatımı kaybetmedim. Şimdi kontrollerim düzenli ve sağlıklıyım. Yeni tanı alan herkese şunu söylemek istiyorum: Yalnız değilsiniz!',
    tags: ['Kemoterapi', 'Cerrahi', 'İyileşme'],
    likes: 128,
    category: 'İyileşme Hikayesi',
  },
  {
    id: '2',
    name: 'Hatice M.',
    age: 38,
    stage: 'Evre I',
    date: '2024-01-20',
    avatar: '🌺',
    title: 'Erken teşhis hayat kurtardı',
    summary: 'Rutin kontrol sırasında tespit edilen küçük bir kitle hayatımı değiştirdi...',
    content:
      'Her yıl düzenli mamografi yaptırırdım ama hiç sorun çıkmamıştı. Bu yıl yaptırdığımda küçük bir kitle tespit edildi. Cerrahi müdahale sonrası kemoterapi almadım. Radyasyon tedavisini tamamladım. Erken teşhisin ne kadar önemli olduğunu bizzat yaşadım. Lütfen düzenli kontrollerinizi yaptırmayı ihmal etmeyin.',
    tags: ['Erken Teşhis', 'Cerrahi', 'Radyoterapi'],
    likes: 95,
    category: 'Erken Teşhis',
  },
  {
    id: '3',
    name: 'Semra A.',
    age: 55,
    stage: 'Evre III',
    date: '2024-02-01',
    avatar: '🌷',
    title: 'Güçlü kadın hikayesi',
    summary: 'Tedavi sürecinde öğrendiklerimi paylaşmak istedim...',
    content:
      'İleri evre meme kanseri tanısı almak çok zordu. Ama vazgeçmedim. 8 kür kemoterapi, ardından cerrahi ve radyoterapi aldım. Bu süreçte öğrendiğim en önemli şey: Destek grubuna katılın. Aynı deneyimi yaşayan insanlarla konuşmak inanılmaz güç verdi. Şimdi remisyondayım ve her günü kutluyorum.',
    tags: ['Kemoterapi', 'Radyoterapi', 'Cerrahi', 'Destek Grubu'],
    likes: 201,
    category: 'İyileşme Hikayesi',
  },
  {
    id: '4',
    name: 'Berna T.',
    age: 45,
    stage: 'Evre II',
    date: '2024-02-10',
    avatar: '🌹',
    title: 'Psikolojik destek şart',
    summary: 'Psikolog desteğinin tedavi sürecime katkısı...',
    content:
      'Fiziksel tedavinin yanı sıra psikolojik destek almak benim için çok önemliydi. Kanser tanısı sadece bedeni değil, ruhu da etkiliyor. Bir psikoonkoloji uzmanıyla düzenli seanslar yaptım. Bu, tedaviyle başa çıkmamı kolaylaştırdı. Ailenize de profesyonel destek önerin - onlar da bu süreci sizinle birlikte yaşıyor.',
    tags: ['Psikolojik Destek', 'Aile Desteği', 'Kemoterapi'],
    likes: 87,
    category: 'Psikolojik Destek',
  },
];

export const faqData = [
  {
    id: '1',
    question: 'Meme kanseri kimlerde daha sık görülür?',
    answer:
      '40 yaş üzeri kadınlarda, ailede meme kanseri öyküsü bulunanlarda, BRCA1/BRCA2 gen mutasyonu taşıyanlarda ve uzun süre hormon tedavisi alanlarda risk daha yüksektir.',
  },
  {
    id: '2',
    question: 'Mamografi ne sıklıkla çektirilmeli?',
    answer:
      '40-49 yaş arası kadınlar için 1-2 yılda bir, 50 yaş üzeri için ise her yıl mamografi çektirilmesi önerilir. Yüksek riskli bireylerde daha erken ve sık tarama gerekebilir.',
  },
  {
    id: '3',
    question: 'Kemoterapi sürecinde ne yemeli?',
    answer:
      'Protein ağırlıklı beslenme, bol sıvı tüketimi ve antioksidan içeren meyve-sebze tüketimi önerilir. Bulantı döneminde az ve sık yemek yemek, soğuk veya oda sıcaklığında yiyecekler tercih edilebilir.',
  },
  {
    id: '4',
    question: 'Tedavi sonrası kontroller nasıl olmalı?',
    answer:
      'İlk 2 yıl her 3-6 ayda bir, sonraki 3 yıl her 6-12 ayda bir doktor kontrolü önerilir. Yıllık mamografi ve gerektiğinde ek görüntüleme yapılır.',
  },
];
