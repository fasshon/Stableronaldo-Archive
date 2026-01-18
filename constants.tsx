import { Video, Category } from './types';


const formatDuration = (seconds: number): string => {
  console.log('[DEBUG] constants.tsx: formatDuration called', { seconds });
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const formatted = h > 0 ? `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}` : `${m}:${s.toString().padStart(2, '0')}`;
  console.log('[DEBUG] constants.tsx: formatDuration result', { seconds, formatted });
  return formatted;
};

const extractYoutubeId = (url: string): string => {
  console.log('[DEBUG] constants.tsx: extractYoutubeId called', { url });
  const id = url.split('v=')[1]?.split('&')[0] || '';
  console.log('[DEBUG] constants.tsx: extractYoutubeId result', { url, id });
  return id;
};

// Raw list provided by the user
const rawData = [
  {"title": "[2026-1-16] - Getting A Makeover W/ Marlon FULL Stream!", "url": "https://www.youtube.com/watch?v=cdaaM25bbfg", "duration": 31464, "upload_date": "20260117"},
  {"title": "[2026-01-15] Birthday Party FULL Stream!", "url": "https://www.youtube.com/watch?v=XrWzATP7fMw", "duration": 31464, "upload_date": "20260115"},
{"title": "[2026-01-14]  Elden Ring DLC Marathon FULL Stream! Part 6", "url": "https://www.youtube.com/watch?v=p0Iwtv9XTX0", "duration": 43198, "upload_date": "20260114" },
{"title": "[2026-01-13] Elden Ring DLC Marathon FULL Stream! Part 5", "url": "https://www.youtube.com/watch?v=TqzSYkK3LXE", "duration": 6726, "upload_date": "20260113" },
{"title": "[2026-01-13] Elden Ring DLC Marathon FULL Stream! Part 4", "url": "https://www.youtube.com/watch?v=Uy8AUEUCo7g", "duration": 41435, "upload_date": "20260112" },
{"title": "[2025-12-17] FAZEMAS DAY 4  CINNA VS RON FORTNITE 99 KILL LEADWINNING THE LOTTERY  FAZE HOCKEY ", "url": "https://www.youtube.com/watch?v=ee1EEgIbCQ4", "duration": 34944, "upload_date": "20251218"},
{"title": "[2025-12-16]  FAZEMAS DAY 3  JYNXZI VS RON & CLIX R6 $10,000 WAGER  FAZE VR GAME NIGHT ", "url": "https://www.youtube.com/watch?v=XwNRqdGKRzo", "duration": 28195, "upload_date": "20251217"},
{"title": "[2025-12-15]  FAZEMAS DAY 2  SHOPPING FOR MARLON  IRL  FAZE WAR  R6 PRACTICE ", "url": "https://www.youtube.com/watch?v=qbd9Iargg3U", "duration": 31664, "upload_date": "20251216"},
{"title": "[2025-12-14]  FAZEMAS DAY 1  IRL ALL DAY CHASING MARLON  SAVING MICA ", "url": "https://www.youtube.com/watch?v=tS7-ZVMlb4g", "duration": 22689, "upload_date": "20251215"},
{"title": "[2025-12-12]  BEATING HARDCORE MINECRAFT CHAINED TOGETHER w/ JASON AND ADAPT  PART 3", "url": "https://www.youtube.com/watch?v=YKJDjIr2xbo", "duration": 23789, "upload_date": "20251214"},
{"title": "[2025-12-11]  HARDCORE MINECRAFT CHAINED TOGETHER w/ JASON AND CUFFEM  SLEEPING  PART 2 ", "url": "https://www.youtube.com/watch?v=LeSGdmytsa4", "duration": 38005, "upload_date": "20251213"},
{"title": "[2025-12-07]  STREAMER AWARDS 2025 RECAP  ELDEN RING DLC ANNOUNCEMENT ", "url": "https://www.youtube.com/watch?v=LYuZg-RjNHY", "duration": 9987, "upload_date": "20251208"},
{"title": "[2025-12-05]  NASCAR RACING w/ RAGE  IRL w/ LACY  STREAMER AWARDS PREPARTIONS ", "url": "https://www.youtube.com/watch?v=KAnfmpMfWck", "duration": 20523, "upload_date": "20251206"},
{"title": "[2025-12-04]  SUIT SHOPPING FOR STREAMER AWARDS  REACTIONS  IRL ", "url": "https://www.youtube.com/watch?v=hNlbEN4Ru5c", "duration": 18019, "upload_date": "20251205"},
{"title": "[2025-12-03]  CHRISNXTDOOR FORTNITE 99-0 KILL LEAD 1V1 ", "url": "https://www.youtube.com/watch?v=NdGKI22XixQ", "duration": 11821, "upload_date": "20251204"},
{"title": "[2025-12-02]  ADDRESSING DRAMA  COSTCO w/ BEPSY  BUILDING BURGER A MANSION   GAMES ", "url": "https://www.youtube.com/watch?v=7DuwMAeI4iw", "duration": 29884, "upload_date": "20251203"},
{"title": "[2025-11-30]  PART 2  IRL LIARS BAR FINALE  IRL w/ SILKY   PLAYING EGGING ON  ", "url": "https://www.youtube.com/watch?v=HorN37Ymyxc", "duration": 15013, "upload_date": "20251202"},
{"title": "[2025-11-29]  FORTNITE EVENT w/ JASON, CLIX, LACY AND MORE  GAMING  IRL ", "url": "https://www.youtube.com/watch?v=4F8S7W1yHAI", "duration": 24446, "upload_date": "20251130"},
{"title": "[2025-11-28]  REACTIONS  VISITING PLAQUEBOYMAX  IRL  SPONSER ", "url": "https://www.youtube.com/watch?v=mVaF00555i0", "duration": 32829, "upload_date": "20251129"},
{"title": "[2025-11-23]  STREAMER AWARD CAMPAIGNING w/ JASON  REALITY STREAMER OF THE YEAR ", "url": "https://www.youtube.com/watch?v=CA8m6l8XBS0", "duration": 23704, "upload_date": "20251124"},
{"title": "[2025-11-20]  GAMBLING IN LAS VEGAS w/ LACY, FAXUTY, PILAT, BUGHA AND SKETCH ", "url": "https://www.youtube.com/watch?v=MYCYpmeVdow", "duration": 20504, "upload_date": "20251121"},
{"title": "[2025-11-19]  REACTIONS  DRAMA  SPONGEBOB PACK OPENING w/ BEPSY  IRL ", "url": "https://www.youtube.com/watch?v=GQUkT4RECNU", "duration": 24853, "upload_date": "20251120"},
{"title": "[2025-11-17]  PLAQUEBOYMAX VS STABLERONALDO 99-0 LEAD FORTNITE 1v1 ", "url": "https://www.youtube.com/watch?v=GDWTiku8jq4", "duration": 15524, "upload_date": "20251119"},
{"title": "[2025-11-15]  FIRST STREAM BACK  SUBATHON RECAP  REACTIONS  DESKTOP STREAM ", "url": "https://www.youtube.com/watch?v=BJmp253Nt7I", "duration": 18948, "upload_date": "20251117"},
{"title": "[2025-10-31]  FAZE SUBATHON  LAST DAY  FAZE ROUND TABLE  DAY 31 ", "url": "https://www.youtube.com/watch?v=96b_h7Mm6n4", "duration": 9249, "upload_date": "20251101"},
{"title": "[2025-10-29]  FAZE SUBATHON  RAGE 100K  JASON 300K  DAY 29 (PART 2) ", "url": "https://www.youtube.com/watch?v=rALaftvUdwQ", "duration": 20361, "upload_date": "20251031"},
{"title": "[2025-10-27]  FAZE SUBATHON  FAZE GAME NIGHT  GT3RS DRIVING  DAY 27 (PART 2) ", "url": "https://www.youtube.com/watch?v=pfEgWcKhLfA", "duration": 24035, "upload_date": "20251030"},
{"title": "[2025-10-26]  FAZE SUBATHON  FAZE HALLOWEEN COSTUME CONTEST  DAY 26 (PART 2) ", "url": "https://www.youtube.com/watch?v=cdyCd8mGFuI", "duration": 19157, "upload_date": "20251029"},
{"title": "[2025-10-11]  FAZE SUBATHON  GOING TO A BAR w/ FAZE  DAY 11 (PART 2) ", "url": "https://www.youtube.com/watch?v=Ksyhk8HKD9c", "duration": 15436, "upload_date": "20251027"},
{"title": "[2025-10-05]  FAZE SUBATHON  PERFORMING AT NMS CONCERT  BO3 ZOMBIES w/ ADAPT AND JASON  DAY 5 ", "url": "https://www.youtube.com/watch?v=JFrvhE31iio", "duration": 27989, "upload_date": "20251026"},
{"title": "[2025-09-20]  ACTUAL LAST STREAM BEFORE SUBATHON  REACTIONS  NEW FORTNITE PROXIMITY GAMEMODE ", "url": "https://www.youtube.com/watch?v=7eMubQOWkaY", "duration": 7676, "upload_date": "20250930"},
{"title": "[2025-09-12]  LAST STREAM BEFORE SUBATHON  KAI CENAT FORTNITE SKIN  IRL  BORDERLANDS 4 w/ FAZE ", "url": "https://www.youtube.com/watch?v=7FCjZnxA87M", "duration": 23987, "upload_date": "20250915"},
{"title": "[2025-09-11]  RETURN FROM BREAK  EXPLAINING EVERYTHING  RUST WIPE w/ JYNXZI AND RUST PROS ", "url": "https://www.youtube.com/watch?v=_CmggklxX-U", "duration": 16937, "upload_date": "20250913"},
{"title": "[2025-09-03]  DESKTOP STREAM  GAMES w/ XQC ", "url": "https://www.youtube.com/watch?v=YotRKV2J1O0", "duration": 14430, "upload_date": "20250905"},
{"title": "[2025-08-27]  DESKTOP REACTIONS  IRL w/ BOBA ", "url": "https://www.youtube.com/watch?v=vCDbWdvz_04", "duration": 6132, "upload_date": "20250830"},
{"title": "[2025-08-13]  BUILDING A ZIPLINE  ARCHERY w/ ADAPT AND CINNA  IRL ", "url": "https://www.youtube.com/watch?v=8qooAh4zgPE", "duration": 30069, "upload_date": "20250814"},
{"title": "[2025-08-11]  FORTNITE 99-0 LEAD AGAINST XQC ", "url": "https://www.youtube.com/watch?v=SG_DTFNorbU", "duration": 13997, "upload_date": "20250812"},
{"title": "[2025-08-10]  BURGER IS BACK  IRL w/ LACY  FORNITE w/ CLIX  POLICE CHASE ", "url": "https://www.youtube.com/watch?v=Ie0TUsX3RD4", "duration": 36666, "upload_date": "20250811"},
{"title": "[2025-08-07]  DESKTOP REACTIONS  STREAMER GAMES DRAFT  SHORT STREAM ", "url": "https://www.youtube.com/watch?v=5I95I_HDftk", "duration": 10805, "upload_date": "20250808"},
{"title": "[2025-08-06]  REACTIONS  JYNXZI CLASH ROYALE 99-0 1v1  CS2 1v1 AGAINST XQC ", "url": "https://www.youtube.com/watch?v=CLienQXoykM", "duration": 35496, "upload_date": "20250807"},
{"title": "[2025-08-01]  GETTING AIRSOFT GUNS w/ KAYSAN  REACTIONS  TERMINULL BRIGADE SPONSER ", "url": "https://www.youtube.com/watch?v=ptnsb2-u9eo", "duration": 38592, "upload_date": "20250802"},
{"title": "[2025-07-31]  NEW BATTLEFIELD 6 REVEAL w/ ADAPT, KAYSAN AND ZOOMA ", "url": "https://www.youtube.com/watch?v=g3GdQ21ALCc", "duration": 13914, "upload_date": "20250801"},
{"title": "[2025-07-29]  REACTIONS  CLASH ROYALE w/ JYNXZI  IRL w/ JASON AND ADAPT  WARZEONE ", "url": "https://www.youtube.com/watch?v=Zw_RVCE3uDw", "duration": 25629, "upload_date": "20250731"},
{"title": "[2025-07-25]  ELDEN RING MARATHON  DAY 5  PART 10 ", "url": "https://www.youtube.com/watch?v=OnUN6tPmZB0", "duration": 14000, "upload_date": "20250730"},
{"title": "[2025-07-23]  ELDEN RING MARATHON  DAY 3  PART 6 ", "url": "https://www.youtube.com/watch?v=d0MX-JLQPlU", "duration": 43198, "upload_date": "20250728"},
{"title": "[2025-07-22]  ELDEN RING MARATHON  DAY 2  PART 3 ", "url": "https://www.youtube.com/watch?v=dB213L-h4dU", "duration": 41179, "upload_date": "20250727"},
{"title": "[2025-07-18]  99 KILL LEAD FORNITE 1V1 AGAINST JYNXZI ", "url": "https://www.youtube.com/watch?v=HNjSClttpdw", "duration": 21559, "upload_date": "20250721"},
{"title": "[2025-07-16]  NOT ENDING UNTIL WE HIT A HOLE IN ONE w/ LACY  DESKTOP GAMING  CS CASES ", "url": "https://www.youtube.com/watch?v=z60a-Ul4tCs", "duration": 37368, "upload_date": "20250717"},
{"title": "[2025-07-14]  STAWEENIE FL SESSION  OPENING CASES w/ RUG AND RAIN ", "url": "https://www.youtube.com/watch?v=BbueIrpHj00", "duration": 26864, "upload_date": "20250715"},
{"title": "[2025-07-13]  PERFORMING AT QTCINDERALLAS CHARITY CONCERT  REACTING TO BILLIE EILISH ALBUM ", "url": "https://www.youtube.com/watch?v=NNA-0jNtmCY", "duration": 30404, "upload_date": "20250714"},
{"title": "[2025-07-06]  JULY 4TH RECAP  MAKING LUDWIG BIRTHDAY COOKIES  CS2 CASES w/ LAIYS ", "url": "https://www.youtube.com/watch?v=6_wyBEXD-m8", "duration": 23122, "upload_date": "20250708"},
{"title": "[2025-07-04]  FAZE FOUTH OF JULY PARTY  RESTOCKING STORE  WORKING THE 7/11  PART 4 ", "url": "https://www.youtube.com/watch?v=eE7TUPRNvo8", "duration": 20357, "upload_date": "20250707"},
{"title": "[2025-06-29]  PEAK w/ XQC, LACY & KAYSAN  CS2 w/ VALKYRAE  MOD APPLICATIONS ", "url": "https://www.youtube.com/watch?v=QlJJczWHN9s", "duration": 28051, "upload_date": "20250701"},
{"title": "[2025-06-28]   SHOWING OFF NEW PORSCHE WRAP   FALL GUYS w/ LACY   GETTING CANES w/ BOBA ", "url": "https://www.youtube.com/watch?v=ppp-graKNZ4", "duration": 27183, "upload_date": "20250629"},
{"title": "[2025-06-24]  MARIO KART WORLD CANT END UNTIL I WIN  PART 3 ", "url": "https://www.youtube.com/watch?v=jfkJXrsizkM", "duration": 23671, "upload_date": "20250626"},
{"title": "[2025-06-22]  NBA FINALS GAME 7 WATCHPARTY w/ FAZE  EXPLORING UNIVERSAL ", "url": "https://www.youtube.com/watch?v=stOXMdpa24Q", "duration": 28596, "upload_date": "20250623"},
{"title": "[2025-6-20]  MASTER BAKER JUDGING w/ ADAPT  FAZE VS MONGOLZ CS2 WATCHPARTY  WARZEONE w/ ADAPT ", "url": "https://www.youtube.com/watch?v=xe216MXtpN8", "duration": 33181, "upload_date": "20250622"},
{"title": "[2025-06-19]  PARASOCIAL DEEPDIVE  FZPN w/ ADAPT  THUNDERS VS PACERS GAME 6  WARZONE ", "url": "https://www.youtube.com/watch?v=4eZ_Qhh4b0Y", "duration": 35067, "upload_date": "20250621"},
{"title": "[2025-06-17]  TURNING EMO FOR THE DAY w/ LACY  WARZONE w/ SAID, REDIFY & LAIYS ", "url": "https://www.youtube.com/watch?v=2_WyfiFThxU", "duration": 32059, "upload_date": "20250620"},
{"title": "[2025-06-15]  CAR MEET w/ GIRLFRIEND  NEW NINTENDO SWITCH 2  MARIOKART w/ GIRLFRIEND ", "url": "https://www.youtube.com/watch?v=d-o9HhIAZZ0", "duration": 30472, "upload_date": "20250617"},
{"title": "[2025-06-13]  $6,000 NBA CARD OPENING w/ LACY  CAMPING w/ SKETCH AND LACY ", "url": "https://www.youtube.com/watch?v=vuBnXMGpmJo", "duration": 21280, "upload_date": "20250614"},
{"title": "[2025-06-09]  CALL OF DUTY BO2 1v1s AGAINST FAZE  BUYING SAID A FISH  WARZONE w/ LACY ", "url": "https://www.youtube.com/watch?v=sgpLKGFY1sc", "duration": 24632, "upload_date": "20250610"},
{"title": "[2025-06-05]  FAZE CLAN COURTSIDE AT THE NBA FINALS GAME 1 ", "url": "https://www.youtube.com/watch?v=ALy4h4QjChg", "duration": 1085, "upload_date": "20250606"},
{"title": "[2025-06-05]  PLANE STREAM  FLYING TO NBA FINALS GAME ONE ", "url": "https://www.youtube.com/watch?v=18s7UsSOUAo", "duration": 713, "upload_date": "20250605"},
{"title": "[2025-06-03]  IRL w FAZE  BO2 1v1 AGAINST JASON  WARZONE w/ JASON AND ADAPT ", "url": "https://www.youtube.com/watch?v=-CRnbQudRow", "duration": 23426, "upload_date": "20250604"},
{"title": "[2025-06-02]  BUILDING WORLDS LONGEST DOMINOS  IRL w/ DLOU  NOS IS BACK ", "url": "https://www.youtube.com/watch?v=zRSG4qePWFg", "duration": 17709, "upload_date": "20250603"},
{"title": "[2025-06-01]  DAY 1 OF JUNE  BEST BUY w/ LACY AND ADAPT  BOXING XIMENA  RAVING w/ KAYSAN ", "url": "https://www.youtube.com/watch?v=mrLF_ZWilWg", "duration": 22279, "upload_date": "20250602"},
{"title": "[2025-05-30]  NEW FAZE HOUSE REVEAL  IRL w/ FAZE ", "url": "https://www.youtube.com/watch?v=Ir1PpLJyLAs", "duration": 32884, "upload_date": "20250531"},
{"title": "[2025-05-29]  LAST DAY IN FAZE HOUSE    FAZE COOKOUT    PLAQUEBOYMAX ALBUM RELEASE PARTY  ", "url": "https://www.youtube.com/watch?v=SS3w73Xxa9w", "duration": 24661, "upload_date": "20250530"},
{"title": "[2025-05-25]  FAZE GAME NIGHT  LAST DAY IN CHERRY HILL ", "url": "https://www.youtube.com/watch?v=rOFvg3R2Us4", "duration": 8323, "upload_date": "20250526"},
{"title": "[2025-05-24]  RETURN TO CHERRY HILL  BURGER REVEAL  WARZONE w/ ADAPT AND JASON ", "url": "https://www.youtube.com/watch?v=D_5fqWWVGjQ", "duration": 18119, "upload_date": "20250525"},
{"title": "[2025-05-21] IRL w/ LACY AND YUGI  RUST AND H1Z1 w/ LACY  KNICKS PACERS GAME 1 REACTION w/ FAZE ", "url": "https://www.youtube.com/watch?v=8H3i33DV03o", "duration": 26611, "upload_date": "20250523"},
{"title": "[2025-05-19]  VALORANT w/ JASON, VALKYRAE, FOOLISH, AND TOAST  DESKTOP REACTIONS ", "url": "https://www.youtube.com/watch?v=snPeY7Cu6Ck", "duration": 12202, "upload_date": "20250520"},
{"title": "[2025-05-17]  DESKTOP STREAM  CHAT DECORATES NEW ROOM  REACTIONS  DRAMA ", "url": "https://www.youtube.com/watch?v=_BK2nWIpQl4", "duration": 20827, "upload_date": "20250518"},
{"title": "[2025-05-14]  $25,000 PETERBOT vs STABLE RONALDO FORNITE 1v1 WAGER ", "url": "https://www.youtube.com/watch?v=8kz_KmFHc5c", "duration": 8651, "upload_date": "20250515"},
{"title": "[2025-05-10]  FNCS PRO-AM FINAL DAY ", "url": "https://www.youtube.com/watch?v=HC2zOlDHKD0", "duration": 17380, "upload_date": "20250511"},
{"title": "[2025-05-09]  JASON BIRTHDAY PARTY STREAM  ", "url": "https://www.youtube.com/watch?v=ci0iVoP6gig", "duration": 7206, "upload_date": "20250510"},
{"title": "[2025-05-05]  IRL AT MAX'S FIRST CONCERT  MORE DRAMA  REACTING TO MET GALA ", "url": "https://www.youtube.com/watch?v=bexg8JlwDzg", "duration": 27677, "upload_date": "20250506"},
{"title": "[2025-05-02]  IRL w/ ADAPT  WARZONE w/ XQC AND ADAPT ", "url": "https://www.youtube.com/watch?v=tVgUinX_4bY", "duration": 23093, "upload_date": "20250503"},
{"title": "[2025-04-25]  IRL w/ FAZE  CONFRONTING LACY  TROLLING FAZE BANKS ", "url": "https://www.youtube.com/watch?v=wbWphX4wbZM", "duration": 16022, "upload_date": "20250429"},
{"title": "[2025-04-26]  BUILDING A ZIPLINE IN THE BACKYARD w/ ADAPT AND MAX ", "url": "https://www.youtube.com/watch?v=2xMGaktmJjA", "duration": 25505, "upload_date": "20250428"},
{"title": "[2025-04-24]  GENGAR POKEMON PACK OPENING w/ JASON AND KAYSAN ", "url": "https://www.youtube.com/watch?v=6uSK2jF7fd0", "duration": 29436, "upload_date": "20250426"},
{"title": "[2025-04-20]  BIGGEST POKEMON PACK OPENING YET GOING FOR CHARIZARD  IRL w/ SILKY AND G-LEAGUE ", "url": "https://www.youtube.com/watch?v=fSjDkSYRZbI", "duration": 31847, "upload_date": "20250422"},
{"title": "[2025-04-18]  $2500 CARD OPENING w/ YUGI  NEW POKEMON PACKS ", "url": "https://www.youtube.com/watch?v=svCHjVAEQtk", "duration": 16108, "upload_date": "20250419"},
{"title": "[2025-04-17]  IRL TRICKSHOTTING w/ ADAPT   NEW AIRSOFT GUNS ", "url": "https://www.youtube.com/watch?v=iTYRiJuxrcI", "duration": 25824, "upload_date": "20250418"},
{"title": "[2025-04-15]  FNCS PRO-AM DUO ANNOUNCEMENT  FAZE GAME NIGHT  BOULDER GAME ", "url": "https://www.youtube.com/watch?v=4Z7HpTL9g_A", "duration": 27153, "upload_date": "20250417"},
{"title": "[2025-04-14]  BUYING AND TESTING AIRSOFT GUNS  CARD OPENING w/ ADAPT AND KAYSAN ", "url": "https://www.youtube.com/watch?v=CTAVxRPFbHg", "duration": 30998, "upload_date": "20250416"},
{"title": "[2025-04-13]  MARVEL RIVALS w/ BOBA & LAIYS  GAMING  NEW SETUP ", "url": "https://www.youtube.com/watch?v=ViY6NtcRtBE", "duration": 9939, "upload_date": "20250414"},
{"title": "[2025-04-12]  CARS N COFFEE w/ BOBA  BUILDING WATERSLIDE w/ ADAPT ", "url": "https://www.youtube.com/watch?v=iBwOKRXsa1k", "duration": 39982, "upload_date": "20250413"},
{"title": "[2025-04-10]  KEN CARSON ALBUM REACTION ", "url": "https://www.youtube.com/watch?v=iEW7Qba7xgI", "duration": 9019, "upload_date": "20250411"},
{"title": "[2025-04-09]  POKEMON CARD OPENING w/ YUGI  IRL w/ ADAPT ", "url": "https://www.youtube.com/watch?v=5SQMSm0IBvg", "duration": 20339, "upload_date": "20250410"},
{"title": "[2025-04-06]  YUGI, NOS & DREW TAKE OVER STREAM  FAZE SHOOT  FAXUTY FORTNITE 1v1  PACK OPENING ", "url": "https://www.youtube.com/watch?v=Wy7BJPBROcQ", "duration": 34467, "upload_date": "20250407"},
{"title": "[2025-04-04]  HUGE POKEMON AND BASKETBALL PACK OPENING  IRL w/ ADAPT ", "url": "https://www.youtube.com/watch?v=Nfgs1PqDzXI", "duration": 18795, "upload_date": "20250405"},
{"title": "[2025-04-03]  WARZONE w/ ADAPT, XQC & LOS  NOT GETTING OFF UNTIL WIN  VERDANSK IS BACK ", "url": "https://www.youtube.com/watch?v=QWmnvi76Olc", "duration": 20378, "upload_date": "20250404"},
{"title": "[2025-04-02]  MAKING MAX BIRTHDAY SONG w/ FAZE  1ST FL SESSION  DESKTOP STREAM ", "url": "https://www.youtube.com/watch?v=AZ7NQrKQtvU", "duration": 17921, "upload_date": "20250403"},
{"title": "[2025-04-01]  APRIL FOOLS DAY  IRL STREAM  IRL w/ ADAPT  BESTBUY w/ GILBERT ", "url": "https://www.youtube.com/watch?v=WxRKZFRMyrI", "duration": 35060, "upload_date": "20250402"},
{"title": "[2025-03-30]  PORSCHE REVEAL  DRIVING IN ADAPT'S UNC CAR  VALORANT  IGOR REACTION ", "url": "https://www.youtube.com/watch?v=52q7u-Lk3KU", "duration": 30343, "upload_date": "20250401"},
{"title": "[2025-03-28]  ARCADE STREAM  NOT ENDING TILL WINNING MAX PRIZE ", "url": "https://www.youtube.com/watch?v=-xZnwBn_DX4", "duration": 24337, "upload_date": "20250329"},
{"title": "[2025-03-27]  IRL w/ LACY AND ADAPT  TAKE CARE ALBUM REACTION  DRONE FLYING ", "url": "https://www.youtube.com/watch?v=JVwiKj9G9VA", "duration": 33524, "upload_date": "20250328"},
{"title": "[2025-03-24]  IRL w/ ADAPT  LISTENING TO TRAVIS SCOTT RODEO 1v1ing CLIX ON FORTNITE ", "url": "https://www.youtube.com/watch?v=lA_EKarc75g", "duration": 29803, "upload_date": "20250326"},
{"title": "[2025-03-23]  BACK IN LA  BLONDE ALBUM REACTION DESKTOP STREAM  IRL w/ ADAPT ", "url": "https://www.youtube.com/watch?v=s0N_ED3dAT0", "duration": 33677, "upload_date": "20250325"},
{"title": "[2025-03-21]  MIAMI DAY 4  CARNIVAL STREAM   XQC x FAZE   LAST DAY ", "url": "https://www.youtube.com/watch?v=49wZc9UBzpY", "duration": 25367, "upload_date": "20250322"},
{"title": "[2025-13-20]  MIAMI DAY 3  GOING FISHING  YACHT PARTY w/ FAZE ", "url": "https://www.youtube.com/watch?v=lnubOzOYe6U", "duration": 25568, "upload_date": "20250321"},
{"title": "[2025-03-19]  MIAMI DAY 2  GOING TO A PARTY  LINKING UP WITH VINCE LANNONE ", "url": "https://www.youtube.com/watch?v=swKcKmfAqGA", "duration": 14328, "upload_date": "20250320"},
{"title": "[2025-03-18]  MIAMI DAY 1  IRL BINGO w/ YUGI ", "url": "https://www.youtube.com/watch?v=YjXBaf17ZPs", "duration": 42711, "upload_date": "20250319"},
{"title": "[2025-03-15]  BUYING A CAR  IRL AND DESKTOP w/ YUGI AND BOBA  ADIN ROSS BOXING EVENT ", "url": "https://www.youtube.com/watch?v=wLKtVLff7nk", "duration": 36509, "upload_date": "20250317"},
{"title": "[2025-03-13/14]  PLAYBOI CARTI ALBUM DROP ATTEMPT ", "url": "https://www.youtube.com/watch?v=uQIF9tTh_7M", "duration": 16528, "upload_date": "20250314"},
{"title": "[2025-03-12]  RON x LACY x ARAB  IRL AROUND ATLANTA w/ FAZE ", "url": "https://www.youtube.com/watch?v=ioiNwQBrIHA", "duration": 14596, "upload_date": "20250313"},
{"title": "[2025-03-10]  SIDEMEN CHARITY MATCH DEBRIEF  EXPLORING LONDON w/ ARKY  LAST DAY IN LONDON ", "url": "https://www.youtube.com/watch?v=Wg62H_XGRjw", "duration": 15231, "upload_date": "20250311"},
{"title": "[2025-03-08] SHORT PRE SIDEMEN CHARITY MATCH STREAM", "url": "https://www.youtube.com/watch?v=JxAMXjTEqhk", "duration": 484, "upload_date": "20250308"},
{"title": "[2025-03-06]   XQC X RON LONDON IRL ", "url": "https://www.youtube.com/watch?v=dhl1_ePcx1s", "duration": 17002, "upload_date": "20250307"},
{"title": "[2025-03-04]  LOST IN LA w/ YUGI AND LACY ", "url": "https://www.youtube.com/watch?v=i1fQH81nv3U", "duration": 29727, "upload_date": "20250305"},
{"title": "[2025-03-02]  REFFING LACY BASKETBALL LEAGUE IRL w/ OSCS  GAMES w/ XQC", "url": "https://www.youtube.com/watch?v=CE4qnLdUlq4", "duration": 37226, "upload_date": "20250304"},
{"title": "[2025-03-01]  IRL ADVENTURE  COD ZOMBIES w/ ADAPT AND YUGI  VR CHAT w/ YUGI ", "url": "https://www.youtube.com/watch?v=mIo6nH-EJQo", "duration": 32723, "upload_date": "20250302"},
{"title": "[2025-02-26]  FAZE GAME NIGHT ATTEMPT  STREAM CRASHED ", "url": "https://www.youtube.com/watch?v=QkXitr-WRmc", "duration": 5240, "upload_date": "20250228"},
{"title": "[2025-02-24]  IRL STREAM  UNIVERSAL ADVENTURES w/ ADAPT & LACY  DICK SPORTING GOODS w/ LACY ", "url": "https://www.youtube.com/watch?v=oiFwKZrUzCU", "duration": 31718, "upload_date": "20250225"},
{"title": "[2025-02-22/23] FAZE SLEEPOVER PART 2 ", "url": "https://www.youtube.com/watch?v=3q9dQQPfyEo", "duration": 19148, "upload_date": "20250224"},
{"title": "[2025-02-20]  GREEN SCREEN  BASKETBALL w/ FAZE  GETTING HIGH w/ LACY ", "url": "https://www.youtube.com/watch?v=nTagQkfcXC8", "duration": 34051, "upload_date": "20250221"},
{"title": "*DELETED VOD* [2025-02-18]  LACY BIRTHDAY STREAM  GETTING GIFTS  IRL ", "url": "https://www.youtube.com/watch?v=PTW_9oJtWcs", "duration": 25643, "upload_date": "20250219"},
{"title": "*DELETED VOD* [2025-02-16]  FNCS FINALS WATCH PARTY DAY 2  CAR MEET w/ JASON AND LACY ", "url": "https://www.youtube.com/watch?v=_GQQkSZHZV0", "duration": 34617, "upload_date": "20250217"},
{"title": "[2025-02-13]  REACTIONS  IRL TROLLING w/ LACY AND ADAPT  SKYZONE w/ FAZE ", "url": "https://www.youtube.com/watch?v=xJY_8rZvuuQ", "duration": 26450, "upload_date": "20250214"},
{"title": "[2025-02-11]  LIVE ALL DAY  REACTIONS  FAZE GROUP SEGMENT  IRL ", "url": "https://www.youtube.com/watch?v=AF1-0Grpkk8", "duration": 21006, "upload_date": "20250213"},
{"title": "[2025-02-08]  BIG IRL STREAM  ARMY OF STABLE RONALDOS CLONES  STREAMER FLAG FOOTBALL MATCH ", "url": "https://www.youtube.com/watch?v=T7GWuM23EGc", "duration": 16832, "upload_date": "20250210"},
{"title": "[2025-02-07]  KANYE SHOUTED ME OUT  IRL STREAM  2v2 R6 vs EVERY RANK w/ JYNXZI ", "url": "https://www.youtube.com/watch?v=u5Vpu0nDAnY", "duration": 25175, "upload_date": "20250209"},
{"title": "[2025-02-06]  MINECRAFT HARDCORE BOSSES CHALLENGE w/ XQC ", "url": "https://www.youtube.com/watch?v=3PEuGuxF9S4", "duration": 22849, "upload_date": "20250207"},
{"title": "[2025-02-02]  DESKTOP STREAM  MINECRAFT CHALLENGE w/ XQC ", "url": "https://www.youtube.com/watch?v=R-29sb7yOmQ", "duration": 19921, "upload_date": "20250205"},
{"title": "[2025-01-31]  DESKTOP REACTIONS  IKEA w/ ADAPT AND LACY ", "url": "https://www.youtube.com/watch?v=bj5mthbT4So", "duration": 14221, "upload_date": "20250202"},
{"title": "[2025-01-30] IM DEPRESSED  NEED WHEELCHAIR  IRL w/ LACY AND JASON  NMSMP ", "url": "https://www.youtube.com/watch?v=opnBesOHy2o", "duration": 30740, "upload_date": "20250201"},
{"title": "[2025-01-28]  IRL SOCCER VS JASON TEAM  GAMING  NEW DAY  I GOT ALOT TO TALK ABOUT ", "url": "https://www.youtube.com/watch?v=CXpnQnFR3AI", "duration": 16893, "upload_date": "20250131"},
{"title": "[2025-01-26]  INVESTIGATION w/ LACY AND JASON  MINECRAFT SMP  VALORANT w/ BOBA  NEW CAR VIDEO ", "url": "https://www.youtube.com/watch?v=FTTPnu9IExQ", "duration": 32568, "upload_date": "20250129"},
{"title": "[2025-01-17/18 PART 2] 48 HOURS OF CAMPING  LACY AND SKETCH  IRL STREAM  TEXAS  WILDERNESS ", "url": "https://www.youtube.com/watch?v=cKuA7C-DzlQ", "duration": 38374, "upload_date": "20250125"},
{"title": "[2025-01-21] CAR SHOPPING w/ ADAPT  IRL CONTENT ALL DAY  FLIGHT SIMULATOR  NMSMP MC w/ FRIENDS ", "url": "https://www.youtube.com/watch?v=5M0b4JDWpwA", "duration": 35267, "upload_date": "20250124"},
{"title": "[2025-01-14/15 PART 2] 24 HOUR STREAM WITH LACY  NOT ENDING TILL HOUSE BUILT  BIRTHDAY TONIGHT ", "url": "https://www.youtube.com/watch?v=oocy8gDU_tA", "duration": 42428, "upload_date": "20250123"},
{"title": "[2025-01-12]  WE HERE  LIFE IS GREAT  IRL CONTENT TODAY  COACHING CLIX  VALORANT w/ BOBA ", "url": "https://www.youtube.com/watch?v=gQgAO6R2so8", "duration": 29060, "upload_date": "20250116"},
{"title": "[2024-12-31] MY LAST EVER STREAM THIS YEAR  NEW YEARS  WHAT I MISS  CONTENT  LOTS OF STUFF ", "url": "https://www.youtube.com/watch?v=hfhwK2gQrRo", "duration": 31781, "upload_date": "20250115"},
{"title": "[2024-12-15] 1 Second Subathon", "url": "https://www.youtube.com/watch?v=Bprr3qPm1-o", "duration": 777, "upload_date": "20250114"},
{"title": "*DELETED VOD [2024-12-14 PART 1]  FAZE CS MAJOR TONIGHT  JASON LEAVES FAZE?  BIG CAR MEET ", "url": "https://www.youtube.com/watch?v=HkngxaK84hY", "duration": 21925, "upload_date": "20250113"},
{"title": "[2024-12-10] BIG CONTENT  IRL SOCCER  ICE SKATING  GAMES  CONTENT  STUFF  JOIN NOW", "url": "https://www.youtube.com/watch?v=MTg6XiLHt1U", "duration": 31698, "upload_date": "20250111"},
{"title": "[2024-12-05]MY BIGGEST STREAM YET  SO MUCH CONTENT  OG FORNITE TOMORROW  24 HOUR STREAM ", "url": "https://www.youtube.com/watch?v=Itzezwe90vg", "duration": 33903, "upload_date": "20250109"},
{"title": "[2024-11-29] THE RETURN  BEST BUY SEASON 2  BLACK FRIDAY SPECIAL  LAST DAY  CONTENT ", "url": "https://www.youtube.com/watch?v=JGy1tUsy1wE", "duration": 10799, "upload_date": "20241213"},
{"title": "[2024-11-11] WILL I GET NOMINATED (twitter insta stableronaldo)", "url": "https://www.youtube.com/watch?v=-9NP3cQ8joY", "duration": 7410, "upload_date": "20241210"},
{"title": "[2024-11-02 Part 2] Stablethon  NEW FORTNITE OG  LOTS OF STUFF  JOIN CONTENT", "url": "https://www.youtube.com/watch?v=geyn_8rAL64", "duration": 23180, "upload_date": "20241206"},
{"title": "[2024-10-30] I have retired | Jason try outs tonight!", "url": "https://www.youtube.com/watch?v=kl8mkmVsifw", "duration": 30822, "upload_date": "20241205"},
{"title": "[2024-10-13] BIGGEST CAR MEET OF THE YEAR  WITH MY GIRLFRIEND  EARLY MORNING STREAM ", "url": "https://www.youtube.com/watch?v=_WEHerqDU3g", "duration": 10296, "upload_date": "20241203"},
{"title": "[2024-10-11 PART 1]  FIRST STREAM BACK NEW ROOM  GAME NIGHT WITH FAZE  IRL CONTENT IS BACK ", "url": "https://www.youtube.com/watch?v=z9Vb1d70alM", "duration": 22185, "upload_date": "20241202"}
];

// Helper to extract a date string "YYYY-MM-DD" from titles
const parseDateFromTitle = (title: string): string | null => {
  console.log('[DEBUG] constants.tsx: parseDateFromTitle called', { title: title.substring(0, 50) });
  
  // Pattern 1: [YYYY-MM-DD]
  const bracketMatch = title.match(/\[(\d{4}-\d{2}-\d{2})\]/);
  if (bracketMatch) {
    const date = bracketMatch[1];
    console.log('[DEBUG] constants.tsx: parseDateFromTitle - bracket pattern matched', { date });
    return date;
  }

  // Pattern 2: DD MON
  const monthNames: { [key: string]: string } = {
    JAN: '01', FEB: '02', MAR: '03', APR: '04', MAY: '05', JUN: '06',
    JUL: '07', AUG: '08', SEP: '09', OCT: '10', NOV: '11', DEC: '12'
  };
  const dayMonthMatch = title.match(/(\d{1,2})\s+(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)/i);
  if (dayMonthMatch) {
    const day = dayMonthMatch[1].padStart(2, '0');
    const month = monthNames[dayMonthMatch[2].toUpperCase()];
    // Heuristic: If it's OCT-DEC, assume 2024. If JAN-SEP, assume 2025.
    const year = parseInt(month) >= 10 ? '2024' : '2025';
    const date = `${year}-${month}-${day}`;
    console.log('[DEBUG] constants.tsx: parseDateFromTitle - day/month pattern matched', { date, day, month, year });
    return date;
  }

  console.warn('[DEBUG] constants.tsx: parseDateFromTitle - no pattern matched', { title: title.substring(0, 50) });
  return null;
};

// Map and deduplicate (one video per unique date)
const generateVideos = (): Video[] => {
  console.log('[DEBUG] constants.tsx: generateVideos called', {
    rawDataLength: rawData.length
  });

  const channelIcon = "https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_d59671debd614502a569df718016cce8/default/dark/3.0";
  const usedDates = new Set<string>();
  const finalVideos: Video[] = [];

  rawData.forEach((item, i) => {
    const youtubeId = extractYoutubeId(item.url);
    console.log('[DEBUG] constants.tsx: Processing video', {
      index: i,
      title: item.title.substring(0, 50),
      url: item.url,
      youtubeId,
      duration: item.duration
    });
    
    // Use upload_date from raw data if available, otherwise parse from title
    let dateStr: string | null = null;
    if ((item as any).upload_date) {
      // Convert "YYYYMMDD" format to "YYYY-MM-DD"
      const uploadDateStr = (item as any).upload_date.toString();
      if (uploadDateStr.length === 8) {
        dateStr = `${uploadDateStr.substring(0, 4)}-${uploadDateStr.substring(4, 6)}-${uploadDateStr.substring(6, 8)}`;
      }
    }
    
    // Fallback to parsing from title if upload_date is not available
    if (!dateStr) {
      dateStr = parseDateFromTitle(item.title);
    }
    
    // Skip if no date is found or already used
    if (!dateStr) {
      console.warn('[DEBUG] constants.tsx: Skipping video - no date found', {
        index: i,
        title: item.title.substring(0, 50)
      });
      return;
    }
    
    if (usedDates.has(dateStr)) {
      console.warn('[DEBUG] constants.tsx: Skipping video - duplicate date', {
        index: i,
        title: item.title.substring(0, 50),
        dateStr
      });
      return;
    }
    
    usedDates.add(dateStr);
    const dateObj = new Date(dateStr);
    
    if (isNaN(dateObj.getTime())) {
      console.error('[DEBUG] constants.tsx: Invalid date object created', {
        index: i,
        dateStr,
        title: item.title.substring(0, 50)
      });
      return;
    }
    
    const video = {
      id: `vod-${youtubeId}-${i}`,
      youtubeId: youtubeId,
      title: item.title,
      thumbnail: `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`,
      channelName: "Stable Ronaldo",
      channelAvatar: channelIcon,
      views: "Archived",
      postedAt: dateStr,
      uploadDate: dateObj.getTime(),
      duration: formatDuration(item.duration),
      durationSeconds: item.duration,
      category: 'irl',
      description: `Official archive VOD for ${item.title}. Archived on Stable Vods.`
    };
    
    console.log('[DEBUG] constants.tsx: Video created successfully', {
      id: video.id,
      youtubeId: video.youtubeId,
      uploadDate: video.uploadDate,
      dateStr: video.postedAt
    });
    
    finalVideos.push(video);
  });

  console.log('[DEBUG] constants.tsx: generateVideos complete', {
    totalVideos: finalVideos.length,
    usedDatesCount: usedDates.size,
    skippedCount: rawData.length - finalVideos.length
  });

  return finalVideos;
};

console.log('[DEBUG] constants.tsx: Generating INITIAL_VIDEOS');
export const INITIAL_VIDEOS: Video[] = generateVideos();
console.log('[DEBUG] constants.tsx: INITIAL_VIDEOS exported', {
  count: INITIAL_VIDEOS.length,
  firstVideo: INITIAL_VIDEOS[0]?.title?.substring(0, 50) || 'none',
  lastVideo: INITIAL_VIDEOS[INITIAL_VIDEOS.length - 1]?.title?.substring(0, 50) || 'none'
});

export const CATEGORIES: Category[] = [
  { id: 'all', label: 'All' },
  { id: 'irl', label: 'IRL' },
  { id: 'gaming', label: 'Gaming' },
  { id: 'just-chatting', label: 'Just Chatting' },
];