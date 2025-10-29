import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom/client';

// From: types.ts
interface SurgicalCode {
  id: string;
  code: string;
  name_ch: string;
  name_en: string;
}

// From: components/Icons.tsx
const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const GearIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-1.007 1.11-.962a8.714 8.714 0 012.59 0c.55.045 1.02.42 1.11.962l.69 4.162c.493.296.976.641 1.416 1.024l3.65-1.58c.53-.23.904-.693 1.042-1.233a8.71 8.71 0 010 2.466c-.138.54-.512 1.003-1.042 1.233l-3.65 1.58a8.71 8.71 0 01-1.416 1.024l-.69 4.162c-.09.542-.56 1.007-1.11.962a8.714 8.714 0 01-2.59 0c-.55-.045-1.02-.42-1.11-.962l-.69-4.162a8.71 8.71 0 01-1.416-1.024l-3.65-1.58c-.53-.23-.904-.693-1.042-1.233a8.71 8.71 0 010-2.466c.138-.54.512 1.003 1.042 1.233l3.65-1.58c.44-.183.923-.528 1.416-1.024l.69-4.162z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const EditIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
);

const DeleteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.067-2.09 1.02-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
);

const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);


// From: constants.ts
const INITIAL_SURGICAL_CODES: SurgicalCode[] = [
    { id: '70006B', code: '70006B', name_ch: '肌肉或深部組織腫瘤切除術及異物取出術', name_en: 'Excision of muscle or deep tissue tumor, deep foreign body' },
    { id: '71215C', code: '71215C', name_ch: '二氧化碳雷射手術', name_en: 'CO2 laser operation' },
    { id: '71899E', code: '71899E', name_ch: '下腹動脈結紮後分離(用於產後大出血或骨盆出血)', name_en: 'Hypogastric artery ligation related to postpartum hemorrhage or uncontrolled bleeding of pelvis' },
    { id: '71882E', code: '71882E', name_ch: '子宮動脈結紮與分離', name_en: 'uterine artery ligation' },
    { id: '72301H', code: '72301H', name_ch: '腹股溝淋巴腺腫切除術', name_en: 'Excision of inguinal lymphnode' },
    { id: '72308A', code: '72308A', name_ch: '腹股溝淋巴腺腫根治清除術', name_en: 'Radical inguinal lymphnode dissection' },
    { id: '73551F', code: '73551F', name_ch: '骨盆腔淋巴腺切除術', name_en: 'Pelvic lymphadenectomy' },
    { id: '75024C', code: '75024C', name_ch: '後腹腔淋巴結摘除術', name_en: 'Retroperitoneal LN dissection' },
    { id: '75030D', code: '75030D', name_ch: '根除性淋巴結切除術', name_en: 'Radical lymphadenectomy' },
    { id: '75036H', code: '75036H', name_ch: '主動脈旁淋巴切除術', name_en: 'Paraaortic lymph node dissection' },
    { id: '75027J', code: '75027J', name_ch: '髖鼠蹊部淋巴根除術-單側', name_en: 'Ileo-inguinal lymphadenectomy, U' },
    { id: '75028I', code: '75028I', name_ch: '髖鼠蹊部淋巴根除術-雙側', name_en: 'Ileo-inguinal lymphadenectomy, Bil' },
    { id: '73001F', code: '73001F', name_ch: '腸粘連分離術', name_en: 'Enterolysis, freeing adhesion' },
    { id: '73003D', code: '73003D', name_ch: '腸粘連分離術及腸減壓', name_en: 'Enterolysis + Bowel Decompression' },
    { id: '73512G', code: '73512G', name_ch: '腸阻塞、分離腸粘連一併有腸切除及吻合', name_en: 'Intest. obstruct. lysis adh.ban with resection & anastomosis of intestine' },
    { id: '73005B', code: '73005B', name_ch: '腸粘連分離術及切除吻合', name_en: 'Enterolysis + Resect + Anastamosis' },
    { id: '73007J', code: '73007J', name_ch: '腸粘連分離術及改道', name_en: 'Enterolysis + Bypass' },
    { id: '73057E', code: '73057E', name_ch: '良性腸病灶切除術', name_en: 'Excision, Benign bowel lesion' },
    { id: '73053I', code: '73053I', name_ch: '邁克氏憩室切除術', name_en: 'Meckel\'s diverticulectomy' },
    { id: '73067B', code: '73067B', name_ch: '小腸切除術加吻合術', name_en: 'Resection of small bowel, with anastomosis' },
    { id: '73471E', code: '73471E', name_ch: '結腸部分切除術加吻合術', name_en: 'Colectomy, partial, with anastomosis' },
    { id: '73111H', code: '73111H', name_ch: '腸系膜之縫合及修補', name_en: 'Suture and repair of mesentery' },
    { id: '73002E', code: '73002E', name_ch: '腹腔鏡腸粘連剝離術', name_en: 'Laparoscopic adhesionolysis' },
    { id: '73201F', code: '73201F', name_ch: '闌尾膿瘍之引流', name_en: 'Drainage of appendiceal abscess transabdominal' },
    { id: '73202E-1', code: '73202E', name_ch: '闌尾切除術', name_en: 'Appendectomy' },
    { id: '73203D', code: '73203D', name_ch: '闌尾瘻管關閉', name_en: 'Closure of appendiceal fistula' },
    { id: '73204C-1', code: '73204C', name_ch: '腹腔鏡闌尾切除術', name_en: 'Laparoscopic appendectomy' },
    { id: '73202E-2', code: '73202E', name_ch: '闌尾切除術(自費)', name_en: 'Appendectomy' },
    { id: '73204C-2', code: '73204C', name_ch: '腹腔鏡闌尾切除術(自費)', name_en: 'Laparoscopic appendectomy' },
    { id: '73401F', code: '73401F', name_ch: '直腸周圍膿瘍之切開引流', name_en: 'Incision and drainage for periproctal abscess' },
    { id: '73410D', code: '73410D', name_ch: '薦骨與尾骨腫瘤切除,良性', name_en: 'Excision, sacrococcygeal tumor, benign' },
    { id: '73419E', code: '73419E', name_ch: '直腸膀胱瘻管切除術', name_en: 'Closure fistula, reco-vesical' },
    { id: '73532A', code: '73532A', name_ch: '腹壁膿瘍引流術', name_en: 'Drainage of abdominal wall abscess' },
    { id: '73533J', code: '73533J', name_ch: '腹壁腫瘤切除術-良性', name_en: 'Excision of abdominal wall tumor, benign' },
    { id: '73531B', code: '73531B', name_ch: '腹壁腫瘤切除術-惡性', name_en: 'Excision of abdominal wall tumor, malignant' },
    { id: '74404F', code: '74404F', name_ch: '腹壁疝氣修補術-併腸切除', name_en: 'Repair of ventral hernia with bowel resection' },
    { id: '74403G', code: '74403G', name_ch: '腹壁疝氣修補術-無腸切除', name_en: 'Repair of ventral hernia without bowel resection' },
    { id: '74409A', code: '74409A', name_ch: '腹壁疝氣修補術,嵌頓性-無腸切除', name_en: 'Repair of ventral hernia incarceration-without bowel resection' },
    { id: '74410G', code: '74410G', name_ch: '腹壁疝氣修補術,復發性-無腸切除', name_en: 'Repair of ventral hernia recurrence-without bowel resection' },
    { id: '72845G', code: '72845G', name_ch: '腹腔灌洗術', name_en: 'Abdominal lavage' },
    { id: '74408B', code: '74408B', name_ch: '腹腔膿瘍灌洗', name_en: 'Peritoneal toilet' },
    { id: '74602H', code: '74602H', name_ch: '腹腔內膿瘍引流術治療急性穿孔性腹膜炎', name_en: 'Drainage of intraabdominal abscess for acute perforation peritonitis' },
    { id: '74603G', code: '74603G', name_ch: '膈下膿瘍引流術', name_en: 'Drainage of subphrenic abscess' },
    { id: '74604F', code: '74604F', name_ch: '骨盆腔膿瘍引流術-經腹', name_en: 'Drainage of pelvic abscess, transabdominal' },
    { id: '73630H', code: '73630H', name_ch: '骨盆腔膿瘍引流術-經肛門', name_en: 'Drainage of pelvic abscess, transanal' },
    { id: '74601I', code: '74601I', name_ch: '剖腹探查術', name_en: 'Exploratory laparotomy' },
    { id: '74605E', code: '74605E', name_ch: '腹腔良性腫瘤切除術', name_en: 'Excision of intraabdominal tumor, benign' },
    { id: '74607C', code: '74607C', name_ch: '後腹腔良性腫瘤切除術', name_en: 'Excision of retroperitoneal tumor, benign' },
    { id: '74609A', code: '74609A', name_ch: '腹腔內異物卻除術', name_en: 'Removal of intraabdominal foreign body' },
    { id: '78203I', code: '78203I', name_ch: '後腹腔剖腹探查術', name_en: 'Retroperitoneal exploratory laparotomy' },
    { id: '74606D', code: '74606D', name_ch: '腹腔惡性腫瘤切除術', name_en: 'Excision of intraabdominal tumor, malignant' },
    { id: '74608B', code: '74608B', name_ch: '後腹腔惡性腫瘤切除術併後腹腔淋巴腺摘除術', name_en: 'Excision of retroperitoneal tumor, malignant with retroperitoneal lymphadenectomy' },
    { id: '74610G', code: '74610G', name_ch: '腹腔靜脈分流術', name_en: 'Peritoneo-Venous shunt' },
    { id: '74613D', code: '74613D', name_ch: '臍尿管或瘻管切除術與部分膀胱切除術', name_en: 'Excision of Urachal duct or fistula with partial cystectomy' },
    { id: '75242I', code: '75242I', name_ch: '腹式會陰尿道懸吊術', name_en: 'Abdominal perineal urethral suspension (APUS)' },
    { id: '75402A', code: '75402A', name_ch: '膀胱抽吸', name_en: 'Aspiration bladder, with catheterization' },
    { id: '75403J', code: '75403J', name_ch: '膀胱造口術-Open method', name_en: 'Cystostomy - Open method' },
    { id: '75404I', code: '75404I', name_ch: '膀胱造口術-Trocar method', name_en: 'Cystostomy - Trocar method' },
    { id: '75414F', code: '75414F', name_ch: '恥骨上膀胱造口術', name_en: 'Suprapubic cystostomy' },
    { id: '75415E', code: '75415E', name_ch: '恥骨上經皮造口術', name_en: 'Trocar suprapubic cystostomy' },
    { id: '75405H', code: '75405H', name_ch: '膀胱造口閉合', name_en: 'Closure of cystostomy' },
    { id: '75431C', code: '75431C', name_ch: '膀胱取石術', name_en: 'Cystolithotomy' },
    { id: '75418B', code: '75418B', name_ch: '膀胱部分切除術', name_en: 'Partial cystectomy' },
    { id: '75421F', code: '75421F', name_ch: '膀胱全切除術', name_en: 'Cystectomy without pelvis LND without urethrectomy without bladder reconstruction' },
    { id: '75443H', code: '75443H', name_ch: '膀胱全切除術合併尿道全切除術', name_en: 'Cystectomy without pelvis LND with urethrectomy without bladder reconstruction' },
    { id: '75422E', code: '75422E', name_ch: '膀胱全切除術合併原位新膀胱重建術', name_en: 'Cystectomy without pelvis LND without urethrectomy with orthotopic neo-bladder reconstruction' },
    { id: '75452F', code: '75452F', name_ch: '膀胱全切除術及尿道全切除術合併禁尿膀胱重建術', name_en: 'Cystectomy without pelvis LND with urethrectomy with continent reservoir reconstruction' },
    { id: '75423D', code: '75423D', name_ch: '膀胱全切除術合併骨盆腔淋巴切除術', name_en: 'Cystectomy with pelvis LND without urethrectomy without bladder reconstruction' },
    { id: '75454D', code: '75454D', name_ch: '膀胱全切除術及尿道全切除術合併骨盆腔淋巴切除術', name_en: 'Cystectomy with pelvis LND with urethrectomy without bladder reconstruction' },
    { id: '75456B', code: '75456B', name_ch: '膀胱全切除術及骨盆腔淋巴切除術及尿道全切除術合併禁尿膀胱重建術', name_en: 'Cystectomy with pelvis LND with urethrectomy with continent reservoir reconstruction' },
    { id: '75429H', code: '75429H', name_ch: '膀胱成形術或膀胱尿道成形術', name_en: 'Cystoplasty or cystourethroplasty' },
    { id: '75425B', code: '75425B', name_ch: '膀胱尿道成形術併單側或雙側輸尿管膀胱吻合術', name_en: 'Cystourethroplasty with unilateral or bilateral uretero neo cystotomy' },
    { id: '75437G', code: '75437G', name_ch: '膀胱頸尿道前固定術或尿道固定術', name_en: 'Vesicourethropexy, anteriro or Urethropexy as Marshall-Marchetti type' },
    { id: '75427J', code: '75427J', name_ch: '膀胱縫合術', name_en: 'Cystorrhaphy' },
    { id: '75417C', code: '75417C', name_ch: '膀胱陰道瘻管閉合術,由腹部開刀', name_en: 'Closure fistula, vesicovaginal abdominal approach' },
    { id: '75438F', code: '75438F', name_ch: '膀胱子宮瘻管閉合術,包含子宮切除術', name_en: 'Closure fistula, vesicouterine with or without hysterectomy' },
    { id: '75439E', code: '75439E', name_ch: '膀胱腸管成形術,包含腸吻合', name_en: 'Enterocystoplasty including bowel anastomosis' },
    { id: '75448C', code: '75448C', name_ch: '皮膚膀胱造口術', name_en: 'Cutaneous vesicostomy' },
    { id: '75416D', code: '75416D', name_ch: '經皮膀胱造療術', name_en: 'Cutaneous cystostomy' },
    { id: '75447D', code: '75447D', name_ch: '膀胱尿道鏡及輸尿管取石', name_en: 'Cystourethroscopy with removal of ureteral calculus' },
    { id: '75441J', code: '75441J', name_ch: '經尿道膀胱頸切開術', name_en: 'Tur for bladder neck' },
    { id: '75434J', code: '75434J', name_ch: '腹式尿失禁手術', name_en: 'Transabdominal urinary incontinence surgery' },
    { id: '75432B', code: '75432B', name_ch: '男性鐵弗龍注射', name_en: 'Teflon injection in man' },
    { id: '75433A', code: '75433A', name_ch: '女性鐵弗龍注射', name_en: 'Teflon injection in female' },
    { id: '75435I', code: '75435I', name_ch: '陰道式尿失禁手術(含Kelly plication)', name_en: 'Transvaginal urinary incontinence surgery (Kelly plication included)' },
    { id: '75436H', code: '75436H', name_ch: 'Burch尿失禁手術', name_en: 'Burch Colposuspension' },
    { id: '75408E', code: '75408E', name_ch: '間質性膀胱炎膀胱尿道鏡擴張術', name_en: 'Cystourethroscopy with dilation of bladder for interstitial cystitis' },
    { id: '75428I', code: '75428I', name_ch: '膀胱憩室電燒', name_en: 'Coagulation of bladder diverticulum' },
    { id: '75426A', code: '75426A', name_ch: '部份膀胱及膀胱憩室切除術', name_en: 'Partial cystectomy with excision of bladder diverticulum' },
    { id: '75419A', code: '75419A', name_ch: '膀胱破裂修補術', name_en: 'Repair of bladder rupture' },
    { id: '75413G', code: '75413G', name_ch: '小腸膀胱增大術', name_en: 'Augmentation of U-B with intestine' },
    { id: '75401B', code: '75401B', name_ch: '膀胱懸吊術', name_en: 'Suspension of urinary bladder' },
    { id: '75420G', code: '75420G', name_ch: 'KELLY手術', name_en: 'KELLY operation' },
    { id: '75630D', code: '75630D', name_ch: '尿道人工擴約肌植入術', name_en: 'Artificial urinary sphincter implantation' },
    { id: '75409D', code: '75409D', name_ch: '(後)腹腔鏡膀胱頸懸吊術', name_en: '(Retroperitoneoscopy) Laparoscopy, Bladder neck suspension' },
    { id: '75410J', code: '75410J', name_ch: '(後)腹腔鏡膀胱憩室切除術(單個或多發性者)', name_en: '(Retroperitoneoscopy) Laparoscopy, Bladder diverticulectomy' },
    { id: '75601B', code: '75601B', name_ch: '尿道結石(異物)除去術', name_en: 'Remove of urethral stone or foreign body' },
    { id: '75608E', code: '75608E', name_ch: '外尿道口息肉切除術', name_en: 'Polypectomy, external urethral' },
    { id: '75607F', code: '75607F', name_ch: '尿道腫瘤切除術', name_en: 'Resection of urethral tumor' },
    { id: '75611I', code: '75611I', name_ch: '尿道瘻管修補術(前段)', name_en: 'Urethral fistulectomy (anterior)' },
    { id: '75609D', code: '75609D', name_ch: '尿道瘻管修補術(後段)', name_en: 'Urethral fistulectomy (posterior)' },
    { id: '75634J', code: '75634J', name_ch: '尿道周膿瘍切開引流術', name_en: 'I&D for peri-urethral abscess' },
    { id: '77001H', code: '77001H', name_ch: '會陰膿腫切開引流(非產科)', name_en: 'Incision and drainage of perineal abscess (Non-obstetric)' },
    { id: '77002G', code: '77002G', name_ch: '會陰修補', name_en: 'repair of perineum' },
    { id: '77003F', code: '77003F', name_ch: '會陰修補及肛門損傷修補', name_en: 'Repair of perinueum with repair of anal defects' },
    { id: '77004E', code: '77004E', name_ch: '會陰修補及括約肌修補', name_en: 'Repair of perinueum with sphincter repair' },
    { id: '77209J', code: '77209J', name_ch: '女陰白斑切除術', name_en: 'Excision of genital leukoderma' },
    { id: '77213C', code: '77213C', name_ch: '廣泛性外陰膿瘍引流術', name_en: 'Extended drainage of external genital abscess' },
    { id: '77222A', code: '77222A', name_ch: '巴氏腺囊腫造袋術', name_en: 'Marsupialization of Bartholin\'s gland cyst' },
    { id: '77221B', code: '77221B', name_ch: '巴氏腺囊切除術', name_en: 'Excision of Bartholin\'s gland' },
    { id: '77224I', code: '77224I', name_ch: '前庭大腺囊腫切除', name_en: 'Excision of sken\'s cyst' },
    { id: '77206C', code: '77206C', name_ch: '女陰切除術或廣泛性外陰癌組織切除', name_en: 'Simple vulvectomy or wide local excision of valvar cancer' },
    { id: '77208A', code: '77208A', name_ch: '女陰切除術(合併皮膚或皮下組織重建)', name_en: 'Simple vulvectomy (with skin graft or reconstruction of subcutaneous tissue)' },
    { id: '77211E', code: '77211E', name_ch: '陰蒂切除術', name_en: 'Clitoridectomy' },
    { id: '77212D', code: '77212D', name_ch: '陰蒂整形術', name_en: 'Clitoroplasty' },
    { id: '77216J', code: '77216J', name_ch: '處女膜切開術', name_en: 'Hymenotomy' },
    { id: '77207B', code: '77207B', name_ch: '根治女陰切除術', name_en: 'Radical Vulvgectomy' },
    { id: '77217I', code: '77217I', name_ch: '處女膜重建術(自費)', name_en: 'Hymenoplasty' },
    { id: '77236D', code: '77236D', name_ch: '陰道切開探查術或骨盆腔膿腫引流', name_en: 'Vaginotomy or drainage of pelvic abscess' },
    { id: '77234F', code: '77234F', name_ch: '陰道囊腫切除術', name_en: 'Excision of vaginal cyst' },
    { id: '77233G', code: '77233G', name_ch: '陰道中膈切除術', name_en: 'Resection of vaginal Septum' },
    { id: '77225H', code: '77225H', name_ch: '陰道後穹窿切開術', name_en: 'Incision of posterior fornix' },
    { id: '77238B', code: '77238B', name_ch: '陰道縫合術(縫合陰道損傷,非產科)', name_en: 'Vaginal wall repair (Non-obstetric)' },
    { id: '77241F', code: '77241F', name_ch: '陰道會陰縫合術:縫合陰道及會陰損傷,(非產科)', name_en: 'Colpoperineorrhaphy, suture of injury of vagina and/or perineum nonobstetrical' },
    { id: '77226G', code: '77226G', name_ch: '前側陰道縫合術', name_en: 'Colporrhaphy, anterior' },
    { id: '77227F', code: '77227F', name_ch: '後側陰道縫合術', name_en: 'Colporrhaphy, Posterior' },
    { id: '77228E', code: '77228E', name_ch: '前後側陰道縫合術', name_en: 'Anterior and posterior colporrhaphy' },
    { id: '77229D', code: '77229D', name_ch: '前後側陰道縫合術:包含腸膨出修補術', name_en: 'Anterior and posterior colporrhaphy, (including repair of enterocele)' },
    { id: '77244C', code: '77244C', name_ch: '經陰道骨盆底重建手術(陰道懸吊術,陰道前後壁修補)', name_en: 'Transvaginal pelvic floor reconstruction (vaginal suspension, colporrhaphy combined anterior-posterior)' },
    { id: '77242E', code: '77242E', name_ch: '從腹腔進入陰道固定術', name_en: 'Transabdominal colpopexy' },
    { id: '77243D', code: '77243D', name_ch: '經腹腔及陰道合併之骨盆底重建術(含子宮切除術)', name_en: 'Combined abdominal and vaginal pelvic floor reconstrction (abdominal hysterectomy, sacrocolpopexy, colporrhaphy combined anterior-posterior)' },
    { id: '77260A', code: '77260A', name_ch: '經陰道骨盆底重建手術(含子宮切除術,陰道懸吊術)', name_en: 'Transvaginal pelvic floor reconstruction (transvaginal hysterectomy, sacro-spinal ligament fixation, colporrhaphy combined anterior-posterior)' },
    { id: '77254J', code: '77254J', name_ch: '麻醉下之陰道擴張術', name_en: 'Vaginal dilation under anesthesia' },
    { id: '77401H', code: '77401H', name_ch: '子宮頸擴張術', name_en: 'Cervical dilatation' },
    { id: '77257G', code: '77257G', name_ch: '腹腔鏡式骨盆腔子宮內膜異位症電燒及切除-輕度', name_en: 'Laparoscopic fulguration or excision of pelvic endometriosis Minimal to mild' },
    { id: '77258F', code: '77258F', name_ch: '腹腔鏡式骨盆腔子宮內膜異位症電燒及切除-中度', name_en: 'Laparoscopic fulguration or excision of pelvic endometriosis - Moderate' },
    { id: '77259E', code: '77259E', name_ch: '腹腔鏡式骨盆腔子宮內膜異位症電燒及切除一重度', name_en: 'Laparoscopic fulguration or excision of pelvic endometriosis Severe' },
    { id: '77231I', code: '77231I', name_ch: '陰道切除術-陰道部份切除', name_en: 'Partial resection of vagina' },
    { id: '77235E', code: '77235E', name_ch: '陰道壁廣泛切除術', name_en: 'Modified Latz-Ko\'s operation' },
    { id: '77230J', code: '77230J', name_ch: '陰道切除術-陰道全部切除,陰道式', name_en: 'Complete resection of vagina, vaginal approach' },
    { id: '77261J', code: '77261J', name_ch: '陰道切除術-陰道全部切除,腹式合併陰道式', name_en: 'Complete resection of vagina, combined abdominal and vaginal approach' },
    { id: '77232H', code: '77232H', name_ch: '陰道閉合術', name_en: 'LeFort colpocleisis' },
    { id: '77239A', code: '77239A', name_ch: '人工陰道重建術(陰道狹窄或陰道缺失)-無皮膚移植', name_en: 'Reconstruction of vagina (vaginal stenosis or vaginal defects, without skin graft)' },
    { id: '77247J', code: '77247J', name_ch: '人工陰道重建術(陰道狹窄或陰道缺失)-有皮膚及大腸等移植', name_en: 'Reconstruction of vagina (vagina stenosis or vaginal defects, with skin, colon or other graft)' },
    { id: '77248I', code: '77248I', name_ch: '利用皮膚作陰道重建術', name_en: 'Reconstruction of vagina - skin' },
    { id: '77249H', code: '77249H', name_ch: '利用大腸作陰道重建術', name_en: 'Reconstruction of vagina - colo' },
    { id: '77251C', code: '77251C', name_ch: '初次直腸陰道瘻管修補術', name_en: 'Primary recto-vaginal fistula repair' },
    { id: '77262I', code: '77262I', name_ch: '再次直腸陰道瘻管修補術', name_en: 'Recurrent recto-vaginal fistula repair' },
    { id: '77252B', code: '77252B', name_ch: '尿道陰道瘻管修補術', name_en: 'Urethral vaginal fistula repair' },
    { id: '77253A', code: '77253A', name_ch: '膀胱陰道瘻管修補術', name_en: 'Vesico vaginal fistula repair' },
    { id: '77246A', code: '77246A', name_ch: '從陰道進入之陰道固定術', name_en: 'Colpopexy, vaginal approach' },
    { id: '77245B', code: '77245B', name_ch: '腹腔鏡陰道懸吊術', name_en: 'Laparoscopic colpopexy' },
    { id: '77263H', code: '77263H', name_ch: '經腹腔之骨盆底重建術', name_en: 'Transabdominal pelvic floor reconstruction' },
    { id: '77264G', code: '77264G', name_ch: '陰道人工網膜外露修復術', name_en: 'Vaginal mesh extrusion repair' },
    { id: '77265F', code: '77265F', name_ch: '陰道式會陰尿道懸吊術', name_en: 'Vaginal perineal urethral suspension(VPUS)' },
    { id: '77417I', code: '77417I', name_ch: '陰道式子宮頸切除術', name_en: 'Vaginal trachelectomy' },
    { id: '77412D', code: '77412D', name_ch: '腹式子宮頸切除術', name_en: 'Abdominal trachelectomy' },
    { id: '77413C', code: '77413C', name_ch: '根除式子宮頸切除術', name_en: 'Radical trachelectomy' },
    { id: '77418H', code: '77418H', name_ch: '子宮頸整形術', name_en: 'Tracheloplasty' },
    { id: '78216C', code: '78216C', name_ch: '子宮頸坐縮術', name_en: 'Shirodker isthmorrhaply' },
    { id: '77419G', code: '77419G', name_ch: '子宮頸縫合術', name_en: 'Cervical cerclage' },
    { id: '93553F', code: '93553F', name_ch: '子宮頸坐縮術縫線(自費)', name_en: 'MERSILENE RS21-22 INCOMP CERVIX' },
    { id: '77416J', code: '77416J', name_ch: '子宮頸殘餘部擴張刮除術', name_en: 'Dilation and curettage of cervical stump' },
    { id: '77405D', code: '77405D', name_ch: '子宮頸楔狀切除術', name_en: 'Cervical conization' },
    { id: '77406C', code: '77406C', name_ch: '子宮頸錐狀切片(刀切)', name_en: 'Cervical conization by knife' },
    { id: '77411E', code: '77411E', name_ch: '子宮頸錐狀切片(利用雷射)', name_en: 'Uterine cervix laser conization' },
    { id: '77408A', code: '77408A', name_ch: '子宮頸切斷術', name_en: 'Cervical amputation' },
    { id: '77410F', code: '77410F', name_ch: '子宮頸蒂瘤切除術', name_en: 'Cervical polypectomy' },
    { id: '77407B', code: '77407B', name_ch: '陰道式殘餘子宮頸切除術', name_en: 'Vaginal excision of cervical stump' },
    { id: '77414B', code: '77414B', name_ch: '腹式殘餘子宮頸切除術', name_en: 'Abdominal excision of cervical stump' },
    { id: '77409J', code: '77409J', name_ch: '經陰道子宮懸吊合併子宮頸部份切除術', name_en: 'Manchester operation (Transvaginal uterine suspension with partial cervicectomy)' },
    { id: '77402G', code: '77402G', name_ch: '診斷性子宮擴括手術(非產科)', name_en: 'D&C for diagnosis (not OBS)' },
    { id: '77403F', code: '77403F', name_ch: '治療性子宮擴括手術(非產科)', name_en: 'D&C for treatment (not OBS)' },
    { id: '64518C', code: '64518C', name_ch: '月經規則術(自費)', name_en: 'Menstrual Regulation' },
    { id: '77601H', code: '77601H', name_ch: '一般子宮肌瘤切除術', name_en: 'Uncomplicated myomectomy' },
    { id: '77629D', code: '77629D', name_ch: '複雜性子宮肌瘤切除術', name_en: 'Complicated myomectomy' },
    { id: '77602G', code: '77602G', name_ch: '一般全子宮切除術', name_en: 'Uncomplicated total hysterectomy' },
    { id: '77630J', code: '77630J', name_ch: '複雜性全子宮切除術', name_en: 'Complicated total hysterectomy' },
    { id: '77603F', code: '77603F', name_ch: '次全子宮切除術', name_en: 'Subtotal hysterectomy' },
    { id: '77812D', code: '77812D', name_ch: '骨盆腔粘連分離術', name_en: 'Lysis of pelvic (abdominal) adhesion' },
    { id: '77823J', code: '77823J', name_ch: '輸卵管剝離術-無顯微鏡', name_en: 'Salpingolysis no microscope' },
    { id: '77608A', code: '77608A', name_ch: '子宮懸吊術', name_en: 'Uterine suspension' },
    { id: '77811E', code: '77811E', name_ch: '子宮廣韌帶裂傷修補或切除術', name_en: 'Repair or resection of broad ligament' },
    { id: '77631I', code: '77631I', name_ch: '子宮輸卵管造口吻合術', name_en: 'Hysterosalpingostomy' },
    { id: '77605D', code: '77605D', name_ch: '子宮縫合術', name_en: 'Hysterorrhaphy' },
    { id: '77604E', code: '77604E', name_ch: '子宮整形術', name_en: 'Metroplastic surgery' },
    { id: '77610F', code: '77610F', name_ch: '雙子宮整形術', name_en: 'Unitication of Uterus' },
    { id: '77813C', code: '77813C', name_ch: 'Spalding-Richardson 氏子宮脱出手術', name_en: 'Spalding-Richardson\'s operation' },
    { id: '77817I', code: '77817I', name_ch: '廣泛性全子宮切除術', name_en: 'Extended hysterectomy' },
    { id: '77819G', code: '77819G', name_ch: '子宮頸癌全子宮根除術', name_en: 'Radical hysterectomy for cervical cancer' },
    { id: '77818H', code: '77818H', name_ch: '陰道式子宮根治手術(Schauta式手術)', name_en: 'Hysterectomy vaginal radical, Schauta type procedure' },
    { id: '77614B', code: '77614B', name_ch: '子宮鏡子宮肌瘤切除術', name_en: 'Hysteroscopic myomectomy' },
    { id: '77616J', code: '77616J', name_ch: '子宮鏡下子宮腔隔膜切除術', name_en: 'Resection uterine septum,hystero' },
    { id: '77615A', code: '77615A', name_ch: '子宮鏡下子宮內膜息肉切除術', name_en: 'Hysteroscopic polypectomy' },
    { id: '77618H', code: '77618H', name_ch: '子宮鏡下子宮異物去除術', name_en: 'Hysteroscopic removal FB' },
    { id: '77617I', code: '77617I', name_ch: '子宮鏡下子宮內膜切除術', name_en: 'Endonactrial ablation, hysteros' },
    { id: '77619G', code: '77619G', name_ch: '子宮鏡下子宮內黏連剝離', name_en: 'Lysis uterine adhesion, hysteros' },
    { id: '77612D', code: '77612D', name_ch: '腹腔鏡全子宮切除術', name_en: 'Laparoscopy hysterectomy' },
    { id: '77626G', code: '77626G', name_ch: '婦癌分期手術', name_en: 'Gynecologic cancer staging surgery (BSO+omentectomy+ATH+retroperitoneal lymphadenectomy)' },
    { id: '77632H', code: '77632H', name_ch: '腹腔鏡式婦癌分期手術', name_en: 'Laparoscopic gynecologic oncology staging surgery' },
    { id: '77627F', code: '77627F', name_ch: '婦癌減積手術', name_en: 'Debulking surgery for gynecologic cancer (BSO+omentectomy+ATH+retroperitoneal lymphadenectomy+radical dissection)' },
    { id: '77628E', code: '77628E', name_ch: '婦癌二次剖腹探查術', name_en: 'Gynecologic oncology second-look laparotomy' },
    { id: '77600I', code: '77600I', name_ch: '腹腔鏡子宮肌瘤切除術', name_en: 'Laparoscopy myomectomy' },
    { id: '77805D', code: '77805D', name_ch: '輸卵管整形術', name_en: 'Salpingoplasty' },
    { id: '77809J', code: '77809J', name_ch: '輸卵管造口術-有顯微鏡', name_en: 'Salpingostomy with microscope' },
    { id: '77827F', code: '77827F', name_ch: '輸卵管補植術-無顯微鏡', name_en: 'Reimplantation no microscope' },
    { id: '77822A', code: '77822A', name_ch: '輸卵管剝離術', name_en: 'Salpingolysis with microscopic' },
    { id: '77824I', code: '77824I', name_ch: '輸卵管吻合術', name_en: 'End to end anastomosis' },
    { id: '77810F', code: '77810F', name_ch: '輸卵管造口術', name_en: 'Salpingostomy without microscopic' },
    { id: '77826G', code: '77826G', name_ch: '輸卵管補植術', name_en: 'Reimplantation with microscopic' },
    { id: '77803F', code: '77803F', name_ch: '輸卵管橫截術(自費)', name_en: 'Transection Fallopian tube' },
    { id: '77808A', code: '77808A', name_ch: '輸卵管結紮後重建手術(自費)', name_en: 'Tubal reconst. S/P T/L' },
    { id: '77815A', code: '77815A', name_ch: '腹腔鏡下輸卵管切除術(自費)', name_en: 'Salpingectomy, laparoscopic' },
    { id: '77821B', code: '77821B', name_ch: '輸卵管結紮術(自費)', name_en: 'Tubal ligation' },
    { id: '78012G', code: '78012G', name_ch: '卵巢切除術附加大網膜切除術', name_en: 'Oophorectomy with omentectomy' },
    { id: '78004H', code: '78004H', name_ch: '腹腔鏡子宮附屬器(卵巢輸卵管)部分或全部切除術-單側', name_en: 'Laparoscopic partial or complete adnexectomy, unilateral (USO/enucleation/salpingectomy)' },
    { id: '78017B', code: '78017B', name_ch: '腹腔鏡子宮附屬器(卵巢輸卵管)部分或全部切除術-雙側', name_en: 'Laparoscopic partial or complete adnexectomy, bilateral (BSO/enucleation/salpingectomy)' },
    { id: '78007E', code: '78007E', name_ch: '卵巢癌再次手術探查術', name_en: 'Second look operation for ovarian cancer' },
    { id: '78211H', code: '78211H', name_ch: '葡萄胎或絨毛膜癌除去術', name_en: 'Removal of molar pregnancy or choriocarcinoma' },
    { id: '78212G', code: '78212G', name_ch: '子宮外孕手術', name_en: 'Ectopic pregnancy operation' },
    { id: '78214E', code: '78214E', name_ch: '胎盤取出術', name_en: 'Manual removal of placenta' },
    { id: '78221E', code: '78221E', name_ch: '剖腹產術', name_en: 'Cesarean section' },
    { id: '78226A', code: '78226A', name_ch: '剖腹產術,自行要需求額外付費21000', name_en: 'CS, self-require, extra pay 21000' },
    { id: '78222D', code: '78222D', name_ch: '前置胎盤或植入性胎盤之剖腹產', name_en: 'C/S due to placenta previa or placenta accreta' },
    { id: '78223C', code: '78223C', name_ch: '剖腹產合併次全子宮切除術', name_en: 'Subtotal hysterectomy after Cesarean section' },
    { id: '78224B', code: '78224B', name_ch: '剖腹產合併全子宮切除術', name_en: 'Total hysterectomy after Cesarean section' },
    { id: '78232A', code: '78232A', name_ch: '妊娠前十二週流產刮宮術', name_en: 'D&C (≤12.Week)' },
    { id: '78234I', code: '78234I', name_ch: '人工流產手術(自費)', name_en: 'D&C, OBS' },
    { id: '78233J', code: '78233J', name_ch: '妊娠超過十二週流產或死胎刮宮術', name_en: 'D&C (>12.Week)' },
    { id: '78235H', code: '78235H', name_ch: '引產無效後之流產或死胎刮宮術', name_en: 'Dilation and evacuation after induction failure' },
    { id: '78242H', code: '78242H', name_ch: '療病流產:以擴張及括除包括吸出括除', name_en: 'Therapeutic abortion by D&C S&C' },
    { id: '78236G', code: '78236G', name_ch: '子宮內管刮除術', name_en: 'Endocervical curettage' },
    { id: '78243G', code: '78243G', name_ch: '子宮切開流產術', name_en: 'Hysterotomy for termination of pregnancy' },
    { id: '78245E', code: '78245E', name_ch: '死胎之引產(12-24週)', name_en: 'Medical induction for fetal death (12-24 weeks)' },
    { id: '78246D', code: '78246D', name_ch: '死胎之引產(超過24週)', name_en: 'Medical induction for fetal death (after 24 weeks)' },
    { id: '78244F', code: '78244F', name_ch: '死胎破取術', name_en: 'Destruction of the dead fetus' },
    { id: '77613C', code: '77613C', name_ch: '骨盤腔臟器摘除術', name_en: 'Pelvic exenteration-Total or Anterior or Posterior' },
    { id: '77624I', code: '77624I', name_ch: '經腹部子宮內避孕器移除術', name_en: 'Transabdominal removal of intrauterine device' },
    { id: '77625H', code: '77625H', name_ch: '薦骨前神經截斷術', name_en: 'Pre-sacral neurectomy' },
    { id: '77633G', code: '77633G', name_ch: '腹腔鏡式薦骨前神經截斷術', name_en: 'Laparoscopic pre-sacral neurectomy' },
    { id: '77701C', code: '77701C', name_ch: '無妊娠併發症之陰道產', name_en: 'Vaginal delivery in normal pregnancy' },
    { id: '77707G', code: '77707G', name_ch: '有妊娠併發症之陰道產', name_en: 'Vaginal delivery in complicated pregnancy (defined as cases with preeclampsia, eclampsia, GDM, malpresentation, and documented major medical or surgical complications)' },
    { id: '77702B', code: '77702B', name_ch: '雙胎分娩', name_en: 'Vaginal delivery of twins' },
    { id: '77703A', code: '77703A', name_ch: '多胎分娩', name_en: 'Vaginal delivery of multiple pregnancy' },
    { id: '78213F', code: '78213F', name_ch: '腹腔鏡子宮外孕手術(含腹腔鏡子宮外孕藥物注射)', name_en: 'Laparoscopic surgery for ectopic pregnancy (including laparoscopic local injection)' },
    { id: '78011H', code: '78011H', name_ch: '骨盆腔惡性腫瘤消滅術', name_en: 'Debulking operation for pelvic cancer' },
    { id: '78001H', code: '78001H', name_ch: '子宮附屬器(卵巢輸卵管)部份或全部切除-單側', name_en: 'Partial or complete adnexectomy, unilateral (USO/enucleation/salpingectomy)' },
    { id: '78002G', code: '78002G', name_ch: '子宮附屬器(卵巢輸卵管)部份或全部切除-雙側', name_en: 'Partial or complete adnexectomy, bilateral (BSO/enucleation/salpingectomy)' },
    { id: '78006F', code: '78006F', name_ch: '卵巢膿瘍切開引流術', name_en: 'Incision and drainage of ovarian abscess' },
    { id: '78002J', code: '78002J', name_ch: '卵巢部份切片術', name_en: 'Biopsy ovary, incisional' },
    { id: '43417D', code: '43417D', name_ch: '膀胱鏡檢', name_en: 'Fibrocystoscopy' },
    { id: '43453F', code: '43453F', name_ch: '診斷性子宮鏡', name_en: 'Diagnostic hysteroscopy' },
];

// From: hooks/useLocalStorage.ts
function useLocalStorage<T,>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    // This function is immediately invoked to get the initial state.
    const savedValue = localStorage.getItem(key);
    if (savedValue) {
      try {
        return JSON.parse(savedValue);
      } catch (error) {
        console.error('Error parsing JSON from localStorage', error);
        localStorage.removeItem(key);
      }
    }
    // If no saved value, use the provided initial value
    if (initialValue instanceof Function) {
      return initialValue();
    }
    return initialValue;
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting item to localStorage', error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}

// From: components/SearchView.tsx
const HighlightedText: React.FC<{ text: string; highlight: string }> = ({ text, highlight }) => {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }
  const keywords = highlight.trim().split(/\s+/).filter(Boolean).map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  if (keywords.length === 0) {
    return <span>{text}</span>;
  }
  const regex = new RegExp(`(${keywords.join('|')})`, 'gi');
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="bg-yellow-200 px-0 py-0 rounded">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
};


const SearchView: React.FC<{ codes: SurgicalCode[] }> = ({ codes }) => {
  const [query, setQuery] = useState('');

  const filteredCodes = useMemo(() => {
    const keywords = query.toLowerCase().split(' ').filter(k => k.trim() !== '');
    if (keywords.length === 0) {
      return [];
    }
    return codes.filter(item => {
      const searchableText = `${item.code} ${item.name_ch} ${item.name_en}`.toLowerCase();
      return keywords.every(keyword => searchableText.includes(keyword));
    });
  }, [query, codes]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Search Surgical Codes</h2>
        <p className="text-gray-600">Enter keywords to find a surgical code. Separate multiple keywords with a space for an AND search.</p>
      </div>
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., Appendectomy, 73202E, 闌尾..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg"
        />
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        {query && filteredCodes.length > 0 && (
          <p className="text-sm text-gray-500 mb-4">Found {filteredCodes.length} result(s) for "{query}".</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCodes.length > 0 ? (
            filteredCodes.map(code => (
              <div key={code.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col justify-between hover:shadow-lg transition-shadow">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-primary-700">
                      <HighlightedText text={code.code} highlight={query} />
                    </h3>
                  </div>
                  <p className="text-gray-800 mb-2 text-base">
                    <HighlightedText text={code.name_ch} highlight={query} />
                  </p>
                  <p className="text-gray-600 text-sm">
                    <HighlightedText text={code.name_en} highlight={query} />
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-10">
              <p className="text-gray-500">
                {query ? 'No results found.' : 'Start typing to see results.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// From: components/AdminView.tsx
const emptyCode: Omit<SurgicalCode, 'id'> = { code: '', name_ch: '', name_en: '' };

const CodeModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (code: SurgicalCode) => void;
  codeToEdit: SurgicalCode | null;
}> = ({ isOpen, onClose, onSave, codeToEdit }) => {
  const [currentCode, setCurrentCode] = useState<Omit<SurgicalCode, 'id'>>(() => codeToEdit || emptyCode);

  React.useEffect(() => {
    setCurrentCode(codeToEdit || emptyCode);
  }, [codeToEdit, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentCode(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...currentCode,
      id: codeToEdit?.id || crypto.randomUUID(),
    });
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold">{codeToEdit ? 'Edit Code' : 'Add New Code'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700">Code</label>
            <input type="text" name="code" value={currentCode.code} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500" required />
          </div>
          <div>
            <label htmlFor="name_ch" className="block text-sm font-medium text-gray-700">Chinese Name</label>
            <textarea name="name_ch" value={currentCode.name_ch} onChange={handleChange} rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500" required />
          </div>
          <div>
            <label htmlFor="name_en" className="block text-sm font-medium text-gray-700">English Name</label>
            <textarea name="name_en" value={currentCode.name_en} onChange={handleChange} rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500" required />
          </div>
          <div className="flex justify-end pt-4">
            <button type="button" onClick={onClose} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              Cancel
            </button>
            <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AdminView: React.FC<{
  codes: SurgicalCode[];
  setCodes: React.Dispatch<React.SetStateAction<SurgicalCode[]>>;
}> = ({ codes, setCodes }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [codeToEdit, setCodeToEdit] = useState<SurgicalCode | null>(null);

  const handleOpenModal = (code: SurgicalCode | null = null) => {
    setCodeToEdit(code);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCodeToEdit(null);
  };

  const handleSaveCode = (code: SurgicalCode) => {
    if (codeToEdit) {
      setCodes(prev => prev.map(c => c.id === code.id ? code : c));
    } else {
      setCodes(prev => [code, ...prev]);
    }
    handleCloseModal();
  };

  const handleDeleteCode = (id: string) => {
    if (window.confirm('Are you sure you want to delete this code?')) {
      setCodes(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Manage Codes</h2>
        <button onClick={() => handleOpenModal()} className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
          <PlusIcon className="w-5 h-5 mr-2" />
          Add New Code
        </button>
      </div>

      <CodeModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveCode}
        codeToEdit={codeToEdit}
      />

      <div className="bg-white shadow overflow-hidden rounded-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chinese Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">English Name</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {codes.map((code) => (
                <tr key={code.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{code.code}</td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 max-w-xs break-words">{code.name_ch}</td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 max-w-xs break-words">{code.name_en}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button onClick={() => handleOpenModal(code)} className="text-primary-600 hover:text-primary-900 p-1">
                      <EditIcon className="w-5 h-5"/>
                    </button>
                    <button onClick={() => handleDeleteCode(code.id)} className="text-red-600 hover:text-red-900 p-1">
                      <DeleteIcon className="w-5 h-5"/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// From: App.tsx
function App() {
  const [isAdminView, setIsAdminView] = useState(false);
  const [codes, setCodes] = useLocalStorage<SurgicalCode[]>('surgicalCodes', INITIAL_SURGICAL_CODES);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-xl md:text-2xl font-bold text-primary-700">
              VGHKS Surgical Code Finder
            </h1>
            <button
              onClick={() => setIsAdminView(!isAdminView)}
              className={`p-2 rounded-full transition-colors duration-300 ${isAdminView ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-primary-500 hover:text-white'}`}
              aria-label={isAdminView ? "Go to Search View" : "Go to Admin Panel"}
            >
              <GearIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {isAdminView ? (
          <AdminView codes={codes} setCodes={setCodes} />
        ) : (
          <SearchView codes={codes} />
        )}
      </main>
       <footer className="bg-white mt-8 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} VGHKS Code Finder. All data is stored locally in your browser.</p>
        </div>
      </footer>
    </div>
  );
}

// From: Original index.tsx (entry point)
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
