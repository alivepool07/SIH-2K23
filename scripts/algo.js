import { lawyers } from '../database/models.js';

const lawList = ['intellectual','personalInjury','property','civil','criminal','family'];

const caseTagRef = {
  intellectual: false,
  personalInjury: false,
  property: false,
  civil: false,
  criminal: false,
  family: false
};

const lawyerTagRef = {
  intellectual: 0,
  personalInjury: 0,
  property: 0,
  civil: 0,
  criminal: 0,
  family: 0
};

const keywords = {
  intellectual: [
    "intellectual",
    "Trademark Infringement",
    "Copyright Infringement",
    "Patent Infringement",
    "Trade Secret Misappropriation",
    "Licensing Dispute",
    "Unfair Competition",
    "Domain Name Dispute",
    "Counterfeiting",
    "Cease and Desist Letters",
    "Infringement Defense",
    "IP Portfolio Management",
    "IP Litigation",
    "IP Counseling",
    "IP Due Diligence",
    "IP Audits",
    "Right of Publicity Claims",
    "False Advertising Claims",
    "IP Mediation",
    "IP Arbitration",
  ],
  personalInjury: ["personalInjury","accident", "injury", "compensation", "negligence", "harm", "medical","doctor", "prescription", "insurance", "hospital"],
  property: [
    "property",
    "trespassed",
    "intruded",
    "encroached",
    "violated",
    "burglarized",
    "broke into",
    "stole",
    "pilfered",
    "inherit",
    "thieved",
    "purloined",
    "shoplifted",
    "swiped",
    "filched",
    "pinched",
    "misappropriated",
    "misused",
    "diverted",
    "vandalized",
    "defaced",
    "damaged",
    "desecrated",
    "on fire",
    "put fire on",
    "incinerated",
    "ignited",
    "converted",
    "misapplied",
    "misappropriated",
    "destructed",
    "received stolen",
    "handled stolen",
    "accepted stolen",
    "engaged in fraudulent conveyance",
    "transferred assets fraudulently",
    "criminally trespassed",
    "illegally entered",
    "unlawfully intruded",
    "committed trespass",
    "broke and entered",
    "forcibly entered",
    "unlawfully accessed",
    "invaded",
    "squatted",
    "occupied unlawfully",
    "damage to property",
    "damage on property",
    "committed criminal trespass to vehicles",
    "unlawfully entered vehicles",
    "trespassed into vehicles",
    "defaced property",
    "graffitied",
    "marred property",
    "counterfeit",
    "fake"
  ],
  civil: [
    "civil",
    "dowry",
    "committed fraud",
    "breached a contract",
    "acted negligently",
    "embezzled",
    "engaged in copyright infringement",
    "committed defamation",
    "libeled",
    "slandered",
    "trespassed",
    "caused a nuisance",
    "converted property",
    "invaded privacy",
    "assaulted",
    "battered",
    "falsely imprisoned",
    "committed identity theft",
    "cyberbullied",
    "stalked",
    "harassed",
    "discriminated",
    "abused elders",
    "abused children",
    "committed domestic violence",
    "sexually harassed",
    "discriminated in employment",
    "wrongfully terminated",
    "engaged in product liability",
    "committed consumer fraud",
    "practiced unfair competition",
    "violated antitrust laws",
    "committed securities fraud",
    "engaged in insider trading",
    "violated environmental regulations",
    "committed toxic torts",
    "practiced medical malpractice",
    "committed malpractice",
    "engaged in legal malpractice",
    "disputed contracts",
    "disputed property rights",
    "had landlord-tenant disputes",
    "engaged in debt collection",
    "committed bankruptcy fraud",
    "committed insurance fraud",
    "infringed on patents",
    "stole trade secrets",
    "exercised eminent domain",
    "damaged property",
    "trespassed to chattels",
    "caused a nuisance",
    "converted property",
    "violated restraining orders",
    "issued false subpoenas",
    "engaged in forgery",
    "committed perjury",
    "violated restraining orders",
    "harbored fugitives",
    "aided and abetted criminal activity"
  ],
  criminal: [
    "criminal",
    "murdered",
    "slaughtered",
    "assassinated",
    "killed",
    "ended a life",
    "assaulted",
    "attacked",
    "struck",
    "aggressed",
    "battered",
    "beat",
    "thrashed",
    "smashed",
    "robbed",
    "stole",
    "looted",
    "burglarized",
    "broke in",
    "intruded",
    "trespassed",
    "invaded",
    "stole",
    "filched",
    "swiped",
    "pinched",
    "embezzled",
    "misappropriated",
    "pilfered funds",
    "diverted assets",
    "defrauded",
    "swindled",
    "conned",
    "deceived",
    "tricked",
    "committed drug offenses",
    "doped",
    "trafficked substances",
    "engaged in narcotics activities",
    "violated drug laws",
    "sexually assaulted",
    "violated",
    "abused",
    "molested",
    "harassed",
    "kidnapped",
    "abducted",
    "snatched",
    "seized",
    "captured",
    "burned down",
    "hacked",
    "breached security",
    "engaged in online fraud",
    "abused",
    "mistreated",
    "harmed",
    "injured",
    "engaged in domestic violence",
    "harmed family members",
    "abused in a domestic setting",
    "inflicted family violence",
    "acted violently at home",
    "committed hate crimes",
    "discriminated",
    "targeted",
    "scammed",
    "fraud",
    "committed traffic violations",
    "broke traffic rules",
    "violated road laws",
    "disregarded traffic regulations",
    "acted recklessly on the road",
    "publicly intoxicated",
    "drank excessively in public",
    "got inebriated in public",
    "appeared drunk in public",
    "consumed alcohol openly",
    "trespassed",
    "intruded",
    "encroached",
    "crossed boundaries",
    "violated property lines",
    "forged",
    "faked",
    "counterfeited",
    "fabricated",
    "created fraudulent documents",
    "engaged in racketeering",
    "conspired",
    "orchestrated organized crime",
    "conducted criminal enterprises",
    "participated in illegal schemes",
    "conspired",
    "collaborated",
    "schemed",
    "worked together in secrecy",
    "laundered money",
    "concealed illegal funds",
    "committed perjury",
    "lied under oath",
    "gave false testimony"
  ],
  family: [
    "family",
    "divorce",
    "initiate child custody proceedings",
    "petition for child support",
    "adopt a child",
    "resolve a property dispute",
    "claim insurance benefits",
    "seek alimony",
    "negotiate a prenup",
    "enforce a court order",
    "defend against a lawsuit",
    "issue a restraining order",
    "seek an injunction",
    "serve a subpoena",
    "file for bankruptcy",
    "deal with debt collection",
    "address workplace discrimination",
    "settle a personal injury claim",
    "resolve a property boundary dispute",
    "seek legal guardianship",
    "resolve a contract dispute",
    "challenge a will's validity",
    "resolve a property title issue",
    "address defamation",
    "claim property rights",
    "engage in alternative dispute resolution",
    "negotiate a settlement agreement",
    "settle a family inheritance dispute",
    "dispute an easement",
    "address neighbor disputes",
    "seek compensation for negligence",
    "resolve a partnership dispute",
    "assert landlord rights",
    "settle a construction dispute",
    "divorce",
    "win custody",
    "obtain child support",
    "adopt",
    "settle property dispute",
    "claim insurance",
    "receive alimony",
    "negotiate prenup",
    "enforce court order",
    "defend lawsuit",
    "issue restraining order",
    "obtain injunction",
    "serve subpoena",
    "file bankruptcy",
    "deal with debt collectors",
    "address workplace bias",
    "settle injury claim",
    "resolve property boundary issue",
    "obtain guardianship",
    "resolve contract dispute",
    "validate will",
    "resolve title issue",
    "address defamation",
    "claim property",
    "settle family dispute",
    "settle easement dispute",
    "resolve neighbor dispute",
    "receive compensation",
    "resolve partnership dispute",
    "exercise landlord rights",
    "settle construction dispute"
  ]
};

const assignTags = (cas)=>{
  let tags = {...caseTagRef};
  cas = cas.toLowerCase();

  lawList.forEach(law=>{
    for(const keyword of keywords[law]){
      if(cas.includes(keyword)){
        tags[law] = true;
        return;
      }
    }
  })

  return tags;
}

const suggestLawyers = async(tags,city)=>{
  const lawyerList = await lawyers.find({cities:{$in:[city]}});

  let keyword = null;
  lawList.forEach(law=>{
    if(tags[law])
      keyword=law;
      return;
  });

  let filteredList=[];
  lawyerList.forEach(x=>{
    if(x.tags[keyword]>0)
      filteredList.push(x);
  });
  
  const n = filteredList.length;
  if(n<=1) return filteredList;
  
  for(var i=0;i<n;i++){
    for(var j=i+1;i<n;i++){
      if(filteredList[i].tags[keyword]<filteredList[j].tags[keyword]){
        const temp = filteredList[i];
        filteredList[i] = filteredList[j];
        filteredList[j] = temp;
      }
    }
  }

  return filteredList;
}

export const caseTags = async(description,city)=>{
  return await suggestLawyers(assignTags(description),city);
}

export const lawyerTags = (caseArr)=>{
//export const lawyerTags = (req,res)=>{
  let tags = {...lawyerTagRef};

  caseArr.forEach(cas => {
  //req.body.caseArr.forEach(cas => {
    const caseTags = assignTags(cas);
    lawList.forEach(law=>{
      if(caseTags[law])
        tags[law]+=1;
    });
  });

  return tags;
  //res.json(tags);
}