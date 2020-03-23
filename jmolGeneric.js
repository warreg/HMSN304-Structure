UpperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" ; /*variable globale*/
LowerCaseLetters = "abcdefghijklmnopqrstuvwxyz" ; /*variable globale*/
AAA_A = ["ALA":"A","ARG":"R","ASP":"D","ASN":"N","CYS":"C","GLU":"E","GLN":"Q","GLY":"G","HIS":"H","ILE":"I","LEU":"L","LYS":"K","MET":"M","PHE":"F","PRO":"P","SER":"S","THR":"T","TRP":"W","TYR":"Y","VAL":"V"];
A_AAA = ["A":"ALA","R":"ARG","D":"ASP","N":"ASN","C":"CYS","E":"GLU","Q":"GLN","G":"GLY","H":"HIS","I":"ILE","L":"LEU","K":"LYS","M":"MET","F":"PHE","P":"PRO","S":"SER","T":"THR","W":"TRP","Y":"TYR","V":"VAL"];




// Exercice 1 — toUpperCase(), toLowerCase()
// =========================================

// fonction pour changer la casse en Maj
function toUpperCase(string) {
    if (string.type != "string") {
        return "  /!\\ 'toUpperCase(string)' Erreur: entrez un 'string' ";
    }
    else {
    var n = UpperCaseLetters.size ;
    var out = string ;
    for (var i=0 ; i<n ; i++) {
        out = out.replace(LowerCaseLetters[i],UpperCaseLetters[i]) ;
    } ;
    return out ;
    }
}

// fonction pour changer la casse  en min
function toLowerCase(string) {
    if (string.type != "string") {
        return " /!\\  'toLowerCase(string)'  Erreur: entrez un 'string' ";
    }
    else {
    var n = LowerCaseLetters.size ;
    var out = string ;
    for (var i=0 ; i<n ; i++) {
        out = out.replace(UpperCaseLetters[i],LowerCaseLetters[i]) ;
    } ;
    return out ;
    }
}



/* Exercice 2 — tr3to1(), tr1to3()
   ===============================
fonction pour traduire un code de trois lettres (paramètre d'entrée) 
en un code d'une lettre (valeur retournée).
tab.keys[1] => ALA 
tab["ALA"] => A ; tab.ALA => A
tab.[tab.keys[1]] => A */

function tr3to1(string) {
	if (string.type != "string" | string.size != 3) {
		print(" /!\\  'tr3to1(string)' : Residu_AAA Incorrect ! ");
        return "?" ;
    }
    else {
		string = toUpperCase(string);
	    var n = AAA_A.size ;
	    var out  = "";
	    
	    for (var i=0 ; i<n ; i++) {
	    	if (string == AAA_A.keys[i]) {
	    		out = AAA_A.[string];
	    		break;
	    	}
	    	else { out = "?"; }
	    }
	    return out;
	}
}

 /*fonction tr1to3(string) pour traduire 
 les codes d'une lettre des acides aminés en codes de trois lettres */

 function tr1to3(string) {
	if (string.type != "string" | string.size != 1) {
		print (" /!\\  'tr1to3(string)' : Residu_A Incorrect ! ") ;
        return "???" ;
    }
    else {
		string = toUpperCase(string);
	    var n = A_AAA.size ;
	    var out  = "";
	    
	    for (var i=0 ; i<n ; i++) {
	    	if (string == A_AAA.keys[i]) {
	    		out = A_AAA.[string];
	    		break;
	    	}
	    	else { out = "???";   	}
	    }
	    return out;
	}
}




/* Exercice 3 — getFileHeader()
   ============================

 Écrire une fonction getFileHeader(modID) telle que :
-l'entrée (modID) est l'identifiant d'un modèle ('n.m', du type chaîne de caractères) ;
-la sortie est une chaîne de caractères contenant l'entête du fichier PDB correspondant au modèle modID ;
 s = getproperty("fileheader") */

function getFileHeader(modID) {
	set pdbGetHeader ON ; /* before loading files ;*/
    
    if (checkModID(modID)) {
    	// obtenir la plage de modèles actifs ;
    	var models_actifs = _modelNumber;
	    // désactiver ces modèles et activer le modèle modID ;
	    model(@modID); /*model function doesn't return anything */
	    // obtenir l'entête du fichier correspondant à modID 
	    var header = getproperty("fileheader");

	    // désactiver modID  - réactiver la plage de modèles initiale ;

	    model(@models_actifs);

	    return header;    
    }
    else {
    	print(" /!\\  'getFileHeader(modID)' : Modele '"+modID+"' n'existe pas ! ");
    }  
}


/* Exercice 4 — checkModID()
   =========================

Définir une fonction checkModID(modID)
pour tester la validité de l'identifiant de modèle modID.  */
function checkModID(modID) {
	var out = false;
	forme = modID.split(".");
	if (modID.type == "string" && forme.length = 2 && forme[1] >= 1 && forme[2] >= 1 && {model = @modID}.size != 0 ) {
		out = true;
	}
	//print(out);
	return out;
}


/* Exercice 5 — splitString()
   ==========================
   Définir une fonction splitString(string,length)
   pour couper une chaîne de caractères en morceaux de longueur fixe. */


function splitString(string,len) {
	var modulo = string.length % len;
	var nb_elemt = string.length / len;
	var tab = [];
	if (string.type == "string" && len.type == "integer" && len > 0) {
		if (modulo != 0) {
			nb_elemt += 1; 
		}
		for (var i = 1; i <= nb_elemt; i++) {
			tab[i] = string[((i*len)-len)+1][i*len];
		}
		return tab;
	}
	else {
		print(" /!\\ 'splitString(string,len)' Erreur!");
		return tab;
	}	
}


/* Exercice 6 — getSeqFromSEQRES()
   ===============================
    Définir une fonction getSeqFromSEQRES(modID,chainID) capable de retourner 
    la séquence d'acides aminés (codes d'une lettre) d'une chaîne à partir des 
    enregistrements SEQRES qui se trouvent dans l'entête du fichier PDB.  */

function getSeqFromSEQRES(modID,chainID) {
	var chainID = toUpperCase(chainID);
	var header = getFileHeader(modID);
	var seqres = header.split().find("seqres","i");
	var chaine_brut = "";
	if ( header != "" ) {
		for (var i = 1; i <= seqres.size; i++ )  {
			if ( chainID == (seqres[i])[12] ) {
				chaine_brut += (seqres[i])[20][80];
			}
		}
		if ( chaine_brut == "" ) {
			print ( " /!\\  'getSeqFromSEQRES(modID,chainID)' : Chaine '"+chainID+"' n'existe pas !")
			return null;
		}
		else {
			var chaine_brut_trim = trimString(chaine_brut," ");
			var chaine_AAA = splitString(chaine_brut_trim,3);
			var chaine_A = "";
			var dico_resMod = getMODRES(modID);
			for (var i = 1 ; i <= chaine_AAA.size ; i++) {
				if ( dico_resMod != {} ) {
					for ( var cle IN dico_resMod.keys ) {
						if ( chaine_AAA[i] == dico_resMod[cle]){
							chaine_AAA[i] = cle;
						}
					}
				}
				chaine_A += tr3to1(chaine_AAA[i]);
			}
			return chaine_A;
		}
	}
}

/* Fonction qui enleve d'une chaine un caractere donné en entrée 
   et renvoie la chaine sans le caractere spécifié */ 
function trimString(maChaine,char){
	var out = "";
	for (var i = 1; i <= maChaine.length; i++){
		if(maChaine[i] != char){ out += maChaine[i]; }
	}
	return out;
}


/* Exercice 7 — getMODRES()
   ========================
   Définir une fonction getMODRES(modID) capable de retourner, 
   à partir des enregistrements MODRES, les noms des résidus modifiés présents 
   dans le modèle modID sous forme d'un tableau associatif 
   contenant les noms des résidus standard qui leur correspondent  */
function getMODRES(modID) {
	var chainID = toUpperCase(chainID);
	var header = getFileHeader(modID);
	var modres = header.split().find("modres","i");
	var dico_MODRES = {};
	var tab_repeat_StdRes = [];
	if ( modres != [] ) {
		for ( i = 1 ; i<=modres.size ; i++ ) {
			tab_repeat_StdRes[i] = (modres[i])[25][27] ;
			dico_MODRES.push( (modres[i])[25][27] , (modres[i])[13][15]  )
			if ( (modres[i])[25][27] == (modres[i])[13][15]  ) {
				print ("ATTENTION :  '"+(modres[i])[25][27]+"' == '"+(modres[i])[13][15]+"'");
			}
		}
		for (var i =1; i <= dico_MODRES.size; i++){
			if ( ifRepeatElement(tab_repeat_StdRes,dico_MODRES.keys[i]) == true ) {
				print ( "ATTENTION : ' "+dico_MODRES[dico_MODRES.keys[i]]+" ' répété !" ) ;
			}
		}
	}
	return dico_MODRES;
}
/* Fonction pour tester si un élément est présent plus d'une fois 
   dans un tableau */
function ifRepeatElement(tab,element) {
	var out = false;
	var compteur = 0;
	for ( var i = 1; i<=tab.length ; i++ ) {
		if ( element == tab[i] ) { compteur += 1 ;}
	}
	if ( compteur > 1 ) { out = true ;}
	return out;
}


// Fonction pour connaitre le nom du modele donné 
function getModel(modID) {
	set pdbGetHeader ON ; /* before loading files ;*/
    if (checkModID(modID)) {
    	var models_actifs = _modelNumber;
	    model(@modID); /*model function doesn't return anything */ 
	    var header = getproperty("fileheader");
	    var modele = header[63][66];
	    model(@models_actifs);
	    print (" modele :  "+modele);
	    return modele;    
    }
    else {
    	print(" /!\\  'getModel(modID)' : Modele '"+modID+"' n'existe pas ! ");
    }  
}

// Fonction pour obtenir l'ensemble des residus d'un modele donné
function getAllSeqFromSEQRES(modID) {
	set pdbGetHeader ON;
	var header = getFileHeader(modID);
	var seqres = header.split().find("seqres","i");
	var chaine_brut = "";
	if ( header != "" ) {
		for (var i = 1; i <= seqres.size; i++ ){
			chaine_brut += (seqres[i])[20][80];	
		}
		var chaine_brut_trim = trimString(chaine_brut," ");
		var tab_AAA = splitString(chaine_brut_trim,3);
		return tab_AAA;
	}
}


/****************PROJET************************/
/* PARTIE 1/4
définir une nouvelle propriété atomique property_seqresno
  correspondant aux numéros séquentiels (à partir de 1) des résidus tels
  qu'ils apparaissent dans les enregistrement SEQRES */

function setPropertySeqresno(modID){
	if (checkModID(modID) == false){
		print (" /!\\ Modele "+modID+ "non reconnu !!! \n");
	}
	else{
		var allseqres = getAllSeqFromSEQRES(modID);									 
        var atomset = {model =  @modID and !solvent and !ligand};
		var i_seqres = 0;						
        var i_chain = 0;						
		var seqCode = "";						 
		var resName = "";						 
		var atom_chain = "";
        
        for (var i=1; i<=atomset.length; i++){
			if (atom_chain != atomset[i].chain){	
				atom_chain = atomset[i].chain;
				i_chain = 0;						
			}
			if (atomset[i].seqcode != seqCode){
				seqCode = atomset[i].seqcode;
				i_chain += 1;
				i_seqres += 1;
			}
            resName = allseqres[i_seqres];
			while (atomset[i].group != resName){
				i_chain += 1;
				i_seqres += 1;
				resName = allseqres[i_seqres];
			}
			atomset[i].property_seqresno = i_chain;										
        }
        print ("Nouvelle property_seqresno définie pour le modele "+modID+"  ! ");
        //return atomset;
	}
}


/* =================================================================
Fonctions pour tester  property_seqresno UNIQUEMENT sur 1a2c.pdb  */

//Sans property_seqresno
function showSeqcode(modID){
	if checkModID(modID){
		model (@modID);
		select all ; backbone -0.2 ;
		select {chain="L"} ; color yellow ;
		select {chain="H"} ; color green ;
		select {chain="I"} ; color red ;
		select {chain="J"} ; color cyan ;
		select {(chain="L" or chain="I") and atomname ="CA"} ;
		label %.0[seqcode]-%[group1] ;
	}
}
//Avec property_seqresno
function showSeqresno(modID){
	setPropertySeqresno(modID);
	select all ; backbone -0.2 ;
	select {chain="L"} ; color yellow ;
	select {chain="H"} ; color green ;
	select {chain="I"} ; color red ;
	select {chain="J"} ; color cyan ;
	select {(chain="L" or chain="I") and atomname ="CA"} ;
	label %.0[property_seqresno]-%[group1] ;
}
/*===============================================================*/


function getAllModel(){	
	first_LastModel = array();
    model ALL;
    models_rang = _modelNumber;
    first_LastModel = models_rang.split(' - ');
    last_fileNumber = (first_LastModel[first_LastModel.length].split('.'))[1];
	
	list_models = array();
	for(var i = 1; i<=last_fileNumber; i++){
		// To transfer to integer
        modID = 0+(i+'.0'); 
		model @modID;
		if (_modelNumber.split(' - ')[2]==""){
			last_modelNumber = 1;
		}
		else{
			last_modelNumber = _modelNumber.split(' - ')[2].split('.')[2];
		}
		for (var j = 1; j<=last_modelNumber;j++){
			mod = ""+i+'.'+j;
			list_models.push(mod);
		}		
	}		
	return list_models;
}

/* PARTIE 2/4
définir, pour chaque résidu de la structure, une nouvelle propriété atomique property_qresno
  correspondant au numéro du résidu de la séquence requête avec lequel le résidu a été aligné. */



	/*query = "MSTHRRLIQRVERKLESTVGDAFARIFGGSIVPQEVEALLRREAADGIQSLQGNRLLAPNEYIITLGVHDYEKMKADPHLTSTGFARDLADYIQEQGWQTYGDVVVRFEQSSNLHTGQFRARGTVNPDVETRPPVIDPVRPQSNHAFGAEPGVAPMSDNSSYRGGQGQGRPDEYYDDRYARPQEDPRGGPDPQGGSDPRGGYPPETGGYPPQPGYPRPRHPDQGDYPEQIGYPDQGGYPEQRGYPEQRGYPDQRGYQDQGRGYPDQGQGGYPPPYEQRPPVSPGPAAGYGAPGYDQGYRQSGGYGPSPGGGQPGYGGYGEYGRGPARHEEGSYVPSGPPGPPEQRPAYPDQGGYDQGYQQGATTYGRQDYGGGADYTRYTESPRVPGYAPQGGGYAEPAGRDYDYGQSGAPDYGQPAPGGYSGYGQGGYGSAGTSAYLRRDRAGSWWYLLASCENTAGRGFDSDIRLVDVTVSRNHAEIKQNGGEYIIMDVNSTNGTYVQGARVNSVRIHDGDHIQLGKFEFEVRAG" ;

	Hit_def        = "Chain A, Crystal Structure Of The Fhaa Fha Domain Complexed With The Intracellular Domain Of Rv3910" ;
	Hit_PDB_ID     = "3OUN" ;
	Hit_chain      = "A" ;
	Hsp_score      = "237" ;
	Hsp_Evalue     = "1.26809e-25" ;
	Hsp_query_from = "434" ;
	Hsp_query_to   = "525" ;
	Hsp_hit_from   = "66" ;
	Hsp_hit_to     = "157" ;
	Hsp_identity   = "40" ;
	Hsp_positive   = "55" ;
	Hsp_gaps       = "0" ;
	Hsp_align_len  = "92" ;
	Hsp_qseq       = "TSAYLRRDRAGSWWYLLASCENTAGRGFDSDIRLVDVTVSRNHAEIKQNGGEYIIMDVNSTNGTYVQGARVNSVRIHDGDHIQLGKFEFEVR" ;
	Hsp_midline    = "TS  L  D      Y L +++N  GRG D + RL+D  VSR H EI++ G      D+NSTNGT V++A+V +    DGD+I LG+ E+ VR" ;
	Hsp_hseq       = "TSVTLQLDDGSGRTYQLREGSNIIGRGQDAQFRLPDTGVSRRHLEIRWDGQVALLADLNSTNGTTVNNAPVQEWQLADGDVIRLGHSEIIVR" ;*/


function setPropertyQresno(blast_file){

	
	var activModel = _modelNumber;
	
	script @blast_file;	 

	// Récupération des variables du fichier blast	
	var hsp_query_from = Hsp_query_from;
	var hsp_hit_from = Hsp_hit_from;
	var hsp_hit_to = Hsp_hit_to;

	// récupération de la sequence requette et de la sequence du Hit 
	var hsp_qseqList = splitString(Hsp_qseq,1);
	var hsp_midlineList= splitString(Hsp_midline,1);
	var hsp_hseqList = splitString(Hsp_hseq,1);

	// Récupération des N° du fichier
	fileNum = getAllModel()[0].split('.')[1];
	// Récupération des N° des modeles
	lastModelNum = 	getAllModel()[0].split('.')[2];
	
	
	// Recherches des modeles
	for (var modelNum = 1 ; modelNum<=lastModelNum;modelNum++){
		var modelID = fileNum+'.'+modelNum;
		//print"le fichier chargé est: "=pdbFile;
		print " Traitement du Modele N°: "+modelID;
		// Appel de  setPropertySeqresno()
		setPropertySeqresno(modelID);
		// Creation des listes des atomes		
		var atomset = {model=@modelID and !solvent and !ligand};
		
		// Index
		var resIndex_inQuery = 0;
		var progressIndex = 1;	
		var i =1;
		
		while(i<=atomset.length){
			if (atomset[i].property_seqresno!=atomset[i-1].property_seqresno){
				if (atomset[i].property_seqresno<hsp_hit_from || atomset[i].property_seqresno>hsp_hit_to){				
					atomset[i].property_qsimil = -1;
					atomset[i].property_qresno = -1;
					i++;

				}else{
					switch(hsp_midlineList[progressIndex]){

						case '+':
							atomset[i].property_qresno = (hsp_query_from + resIndex_inQuery);
							atomset[i].property_qsimil = 1;
							resIndex_inQuery++;
							i++;
							
							break;

						default:
							atomset[i].property_qresno = (hsp_query_from + resIndex_inQuery);
							atomset[i].property_qsimil = 2;
							resIndex_inQuery++;
							i++;
							break;

						case ' ':
							if (hsp_hseqList[progressIndex]!='-'){
								atomset[i].property_qsimil = 0;
								if (hsp_qseqList[progressIndex]!='-'){						
									atomset[i].property_qresno = (hsp_query_from + resIndex_inQuery); 
									resIndex_inQuery++;
								}
								else{
									atomset[i].property_qresno=0;
								}
								i++;
							}else{
								resIndex_inQuery++;
							}
							break;
					}
					progressIndex++;			
				}		
			}
			else{
				atomset[i].property_qsimil = atomset[i-1].property_qsimil;
				atomset[i].property_qresno = atomset[i-1].property_qresno;
				i++;
			}
		}
	}
	model @activModel;	
}


// Une fois chargée !
print("script 'jmolGeneric.jmol' bien chargé.");
