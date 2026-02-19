import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';

const getBotResponse = (message) => {
  const msg = message.toLowerCase().trim();

  const rules = [
    {
      keywords: ['merhaba', 'selam', 'günaydın', 'iyi günler', 'iyi akşamlar', 'hey'],
      response: `Merhaba! Size nasıl yardımcı olabilirim? Sorularınızı çekinmeden sorabilirsiniz, buradayım.`,
    },
    {
      keywords: ['ağrı', 'acı', 'yanma', 'sızı', 'zonklama', 'ağrıyor'],
      response: `Meme bölgesindeki ağrı; menstrüel döngü, hormon değişimleri veya fibrokistik değişiklikler gibi birçok nedenden kaynaklanabilir. Ağrınız ne kadar süredir devam ediyor? Belirli bir bölgede mi yoksa yaygın mı? Bu detaylar değerlendirmemi kolaylaştıracaktır.`,
    },
    {
      keywords: ['kitle', 'şişlik', 'yumru', 'sertlik', 'ele geliyor', 'nodül', 'şişlik hissettim'],
      response: `Meme dokusunda fark ettiğiniz kitle veya sertliği mutlaka muayene ile değerlendirmek gerekir. Kitlenin boyutu, sınırları ve ağrılı olup olmadığı önemlidir. Size en kısa sürede muayene randevusu almanızı şiddetle tavsiye ederim. Kitlelerin büyük çoğunluğu iyi huyludur, paniğe gerek yok.`,
    },
    {
      keywords: ['kemoterapi', 'kemo', 'kemoterapi yan etki', 'ilaç tedavisi'],
      response: `Kemoterapi, meme kanseri tedavisinin önemli bir parçasıdır. Kanser evresine ve tipine göre protokol belirlenir. Yan etkiler kişiden kişiye değişmekle birlikte; bulantı, yorgunluk ve saç dökülmesi en sık görülenlerdir. Şu an kemoterapi görüyor musunuz? Yan etkileriniz için destek alabiliriz.`,
    },
    {
      keywords: ['radyoterapi', 'radyasyon', 'ışın', 'ışınlama'],
      response: `Radyoterapi, özellikle cerrahi sonrası lokal tekrarı önlemek için kullanılan etkili bir tedavi yöntemidir. Seanslar genellikle 15–30 gün sürer. Ciltte kızarıklık ve yorgunluk en yaygın yan etkilerdir. Radyasyon onkoloğunuzla düzenli iletişim halinde olmanız önemlidir.`,
    },
    {
      keywords: ['hormon', 'östrojen', 'progesteron', 'hormonal', 'tamoksifen'],
      response: `Hormona duyarlı meme kanserlerinde (ER+ veya PR+) hormon tedavisi oldukça etkilidir. Tamoksifen veya aromataz inhibitörleri kanserin tekrarlaması riskini önemli ölçüde azaltır. Hormonal tedavi hakkında merak ettikleriniz var mı?`,
    },
    {
      keywords: ['ameliyat', 'operasyon', 'cerrahi', 'mastektomi', 'lumpektomi'],
      response: `Meme kanseri cerrahisinde iki ana yöntem var: Tüm memeyi alan mastektomi ve sadece tümörü çıkaran lumpektomi (meme koruyucu cerrahi). Hangi yöntemin uygulanacağı tümörün boyutu ve yerine göre belirlenir. Ameliyat sonrası rekonstrüksiyon seçenekleri de mevcuttur. Daha fazla bilgi almak istediğiniz bir konu var mı?`,
    },
    {
      keywords: ['metastaz', 'yayıldı', 'yayılma', 'evre 4', 'ilerlemiş'],
      response: `Metastatik meme kanseri (evre 4) artık kronik bir hastalık olarak yönetilebilir hale gelmiştir. Yeni ilaçlar ve hedefli tedaviler sayesinde yaşam kalitesi ve süresi önemli ölçüde artmaktadır. Tedavi seçenekleri biyolojik belirteçlere göre kişiselleştirilir. Bu süreçte hem tıbbi hem de psikolojik destek almanız çok değerlidir.`,
    },
    {
      keywords: ['beslenme', 'diyet', 'yemek', 'gıda', 'ne yemeli', 'ne yiyeyim', 'vitamin'],
      response: `Meme kanseri sürecinde beslenme çok önemlidir. Önerilerim:\n\n• Sebze ve meyveyi bol tüketin (özellikle brokoli gibi turpgiller)\n• İşlenmiş gıda ve kırmızı etten uzak durun\n• Omega-3 açısından zengin balık tüketin\n• Şeker tüketimini azaltın\n• Yeşil çay antioksidan etkisiyle faydalıdır\n• Alkolü bırakın veya minimuma indirin\n\nBir diyetisyenle çalışmanızı da öneririm.`,
    },
    {
      keywords: ['egzersiz', 'spor', 'hareket', 'yürüyüş', 'yoga'],
      response: `Düzenli egzersizin meme kanseri tedavisi sırasında ve sonrasında çok olumlu etkileri vardır:\n\n• Haftada en az 150 dakika orta yoğunlukta aktivite önerilir\n• Yürüyüş, yüzme ve yoga harika seçeneklerdir\n• Kol egzersizleri lenfödem riskini azaltabilir\n\nTedavi aşamanıza göre programı kişiselleştirmek gerekir. Nasıl bir tedavi sürecindeydiniz?`,
    },
    {
      keywords: ['brca', 'genetik', 'gen testi', 'kalıtsal', 'aile', 'annende', 'kız kardeş', 'ailesel'],
      response: `Aile geçmişinde meme veya yumurtalık kanseri varsa genetik danışmanlık ve BRCA1/BRCA2 gen testi önerilebilir. Bu genlerdeki mutasyonlar meme kanseri riskini artırabilir. Test pozitif çıkarsa yoğunlaştırılmış tarama veya koruyucu cerrahi seçenekleri değerlendirilebilir. Ailenizde kanser geçmişi var mı?`,
    },
    {
      keywords: ['korku', 'endişe', 'kaygı', 'korkuyorum', 'üzgün', 'depresyon', 'ağlıyorum', 'zor', 'bunaldım'],
      response: `Böyle hissetmeniz çok anlaşılır. Kanser tanısı ve tedavi süreci duygusal olarak gerçekten zorludur. Yaşadığınız korku ve endişe tamamen normal. Şunu bilmenizi isterim: Yalnız değilsiniz. Hem tıbbi ekibinizden hem de psikolojik destek uzmanlarından yardım almak güçlü bir adımdır. Duygularınızı benimle paylaşmaktan çekinmeyin.`,
    },
    {
      keywords: ['tarama', 'mamografi', 'ultrason', 'kontrol', 'muayene', 'check-up'],
      response: `Düzenli tarama meme kanseri erken teşhisinin temelidir:\n\n• 40 yaş üstü: Yıllık mamografi önerilir\n• Yüksek riskli bireyler: 30 yaşından itibaren MR + mamografi\n• Aylık kendi kendine meme muayenesi tüm yaşlarda önerilir\n• Klinik muayene: Yılda 1–3 kez\n\nSon taramanızı ne zaman yaptırdınız?`,
    },
    {
      keywords: ['lenfödem', 'kol şişliği', 'şişlik kol'],
      response: `Lenfödem, koltuk altı lenf nodları çıkarıldıktan sonra kolda oluşabilen şişliktir. Öneriler:\n\n• Kolu sıkıştırıcı giysilerden kaçının\n• Ağır kaldırmayı sınırlayın\n• Lenfödem fizyoterapisti ile çalışın\n• Kompresyon kıyafetleri kullanın\n\nBelirgin bir şişlik var mı şu an?`,
    },
    {
      keywords: ['iyi huylu', 'fibrokistik', 'kist', 'fibroadenom', 'benign'],
      response: `İyi huylu meme değişiklikleri (kist, fibroadenom, fibrokistik değişiklikler) çok yaygındır ve büyük çoğunluğu tedavi gerektirmez. Ancak düzenli takip önemlidir. Ultrason veya mamografi ile periyodik kontrol önerilir. Mevcut bulgularınız nasıl?`,
    },
    {
      keywords: ['saç', 'saç dökülmesi', 'saçlarım', 'kel'],
      response: `Saç dökülmesi kemoterapi sürecinde en sık karşılaşılan yan etkilerden biridir. Şunu bilmenizi isterim: Tedavi bittikten sonra saçlar genellikle 3–6 ay içinde geri gelir, çoğu zaman daha sağlıklı çıkar. Bu süreçte peruk, bandana veya şapka kullanabilirsiniz. Nasıl hissediyorsunuz bu konuda?`,
    },
    {
      keywords: ['hamilelik', 'gebelik', 'bebek', 'çocuk sahibi', 'hamile'],
      response: `Meme kanseri tedavisi sonrası hamilelik mümkündür ancak zamanlama çok önemlidir. Hormona duyarlı kanserlerde tedavi bittikten sonra en az 2–3 yıl beklenmesi önerilir. Fertilitenizi korumak için tedavi öncesinde yumurta dondurma seçenekleri değerlendirilebilir. Bu konuyu mutlaka onkologunuzla görüşmenizi öneririm.`,
    },
    {
      keywords: ['ağrı kesici', 'ağrı ilacı', 'ne içeyim', 'parasetamol', 'ibuprofen'],
      response: `Ağrı yönetimi için öncelikle onkologunuza danışmanızı öneririm. Bazı ağrı kesiciler kemoterapi ilaçlarıyla etkileşime girebilir. Genel olarak parasetamol daha güvenli bir başlangıç noktasıdır; ancak kan sulandırıcı etkisi nedeniyle aspirin ve ibuprofen bazı hastalarda dikkatli kullanılmalıdır.`,
    },
    {
      keywords: ['teşekkür', 'sağ ol', 'eyvallah', 'çok iyi', 'yardımcı oldunuz', 'yardımcı oldu'],
      response: `Rica ederim! Başka sorularınız olursa her zaman buradayım. Kendinize iyi bakın, sağlıklı günler dilerim.`,
    },
  ];

  for (const rule of rules) {
    if (rule.keywords.some((k) => msg.includes(k))) {
      return rule.response;
    }
  }

  return `Sorunuzu anladım. Bu konuyu daha iyi değerlendirebilmem için biraz daha detay verir misiniz? Şikayetlerinizin ne zamandan beri devam ettiğini ve daha önce herhangi bir tetkik yaptırıp yaptırmadığınızı paylaşırsanız size daha doğru bilgi verebilirim. Unutmayın; burada konuştuklarımız genel bilgi amaçlıdır, kesin tanı için mutlaka yüz yüze muayene gereklidir.`;
};

const ChatScreen = ({ route }) => {
  const { expert } = route.params;

  const [messages, setMessages] = useState([
    {
      id: '0',
      text: `Merhaba! Ben ${expert.name}. ${expert.specialty} alanında size yardımcı olmak için buradayım. Sorularınızı çekinmeden sorabilirsiniz.`,
      isBot: true,
      time: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef(null);

  const sendMessage = () => {
    if (!inputText.trim() || isTyping) return;

    const userMsg = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isBot: false,
      time: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    const question = inputText.trim();
    setInputText('');
    setIsTyping(true);

    const delay = 1000 + Math.random() * 1500;
    setTimeout(() => {
      const botMsg = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(question),
        isBot: true,
        time: new Date(),
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, botMsg]);
    }, delay);
  };

  const formatTime = (date) =>
    date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

  const renderMessage = ({ item }) => (
    <View style={[styles.row, item.isBot ? styles.botRow : styles.userRow]}>
      {item.isBot && (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{expert.avatar}</Text>
        </View>
      )}
      <View style={[styles.bubble, item.isBot ? styles.botBubble : styles.userBubble]}>
        <Text style={[styles.msgText, item.isBot ? styles.botText : styles.userText]}>
          {item.text}
        </Text>
        <Text style={[styles.timeText, item.isBot ? styles.botTime : styles.userTime]}>
          {formatTime(item.time)}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerAvatar}>{expert.avatar}</Text>
          <View style={styles.onlineDot} />
        </View>
        <View>
          <Text style={styles.headerName}>{expert.name}</Text>
          <Text style={styles.headerStatus}>Çevrimiçi • {expert.specialty}</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.list}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            isTyping ? (
              <View style={[styles.row, styles.botRow]}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{expert.avatar}</Text>
                </View>
                <View style={styles.typingBubble}>
                  <ActivityIndicator size="small" color={colors.primary} />
                  <Text style={styles.typingText}>Yazıyor...</Text>
                </View>
              </View>
            ) : null
          }
        />

        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Sorunuzu yazın..."
            placeholderTextColor={colors.grayMedium}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[styles.sendBtn, (!inputText.trim() || isTyping) && styles.sendBtnDisabled]}
            onPress={sendMessage}
            disabled={!inputText.trim() || isTyping}
          >
            <Text style={styles.sendBtnText}>➤</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            ⚕️ Bu sohbet bilgi amaçlıdır. Kesin tanı için muayene gereklidir.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 12,
  },
  headerLeft: { position: 'relative' },
  headerAvatar: { fontSize: 40 },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.success,
    borderWidth: 2,
    borderColor: colors.white,
  },
  headerName: { fontSize: 16, fontWeight: '800', color: colors.textPrimary },
  headerStatus: { fontSize: 12, color: colors.success, fontWeight: '600' },
  list: { padding: 16, gap: 12 },
  row: { flexDirection: 'row', alignItems: 'flex-end', gap: 8 },
  botRow: { justifyContent: 'flex-start' },
  userRow: { justifyContent: 'flex-end' },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.secondaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 20 },
  bubble: {
    maxWidth: '75%',
    borderRadius: 18,
    padding: 12,
    paddingBottom: 8,
  },
  botBubble: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  userBubble: {
    backgroundColor: colors.primary,
    borderTopRightRadius: 4,
  },
  msgText: { fontSize: 15, lineHeight: 22 },
  botText: { color: colors.textPrimary },
  userText: { color: colors.white },
  timeText: { fontSize: 11, marginTop: 4 },
  botTime: { color: colors.textLight, textAlign: 'left' },
  userTime: { color: 'rgba(255,255,255,0.7)', textAlign: 'right' },
  typingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 18,
    borderTopLeftRadius: 4,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 8,
  },
  typingText: { color: colors.textSecondary, fontSize: 14 },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: colors.textPrimary,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: { backgroundColor: colors.grayMedium },
  sendBtnText: { color: colors.white, fontSize: 18 },
  disclaimer: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: colors.secondaryLight,
  },
  disclaimerText: { fontSize: 11, color: colors.primaryDark, textAlign: 'center' },
});

export default ChatScreen;
