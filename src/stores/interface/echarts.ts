export interface ChinaAdd {
	localConfirm: number;
	heal: number;
	dead: number;
	importedCase: number;
	nowSevere: number;
	noInfect: number;
	noInfectH5: number;
	localConfirmH5: number;
	confirm: number;
	nowConfirm: number;
	suspect: number;
}

export interface ShowAddSwitch {
	nowSevere: boolean;
	importedCase: boolean;
	localinfeciton: boolean;
	all: boolean;
	confirm: boolean;
	suspect: boolean;
	dead: boolean;
	nowConfirm: boolean;
	heal: boolean;
	noInfect: boolean;
	localConfirm: boolean;
}

export interface Today {
	confirm: number;
	isUpdated: boolean;
}

export interface Total {
	confirm: number;
	heal: number;
	showHeal: boolean;
	provinceLocalConfirm: number;
	continueDayZeroLocalConfirmAdd: number;
	mtime: string;
	adcode: string;
	nowConfirm: number;
	dead: number;
	mediumRiskAreaNum: number;
	highRiskAreaNum: number;
	continueDayZeroLocalConfirm: number;
	showRate: boolean;
	wzz: number;
}

export interface Total {
	adcode: string;
	wzz: number;
	continueDayZeroLocalConfirmAdd: number;
	provinceLocalConfirm: number;
	highRiskAreaNum: number;
	continueDayZeroConfirmAdd: number;
	confirm: number;
	dead: number;
	heal: number;
	showHeal: boolean;
	mediumRiskAreaNum: number;
	continueDayZeroConfirm: number;
	mtime: string;
	nowConfirm: number;
	showRate: boolean;
}

export interface Today {
	confirm: number;
	confirmCuts: number;
	isUpdated: boolean;
	wzz_add: string;
	local_confirm_add: number;
}

export interface Total {
	wzz: number;
	provinceLocalConfirm: number;
	mediumRiskAreaNum: number;
	nowConfirm: number;
	dead: number;
	heal: number;
	showHeal: boolean;
	adcode: string;
	continueDayZeroLocalConfirmAdd: number;
	mtime: string;
	confirm: number;
	showRate: boolean;
	highRiskAreaNum: number;
	continueDayZeroLocalConfirm: number;
}

export interface Children {
	today: Today;
	total: Total;
	name: string;
	adcode: string;
	date: string;
}

export interface Today {
	tip: string;
	wzz_add: string;
	local_confirm_add: number;
	abroad_confirm_add: number;
	dead_add: number;
	confirm: number;
	confirmCuts: number;
	isUpdated: boolean;
}

export interface Children {
	total: Total;
	children: Children[];
	name: string;
	adcode: string;
	date: string;
	today: Today;
}

export interface AreaTree {
	name: string;
	today: Today;
	total: Total;
	children: Children[];
}

export interface ChinaTotal {
	confirm: number;
	dead: number;
	showlocalinfeciton: number;
	confirmAdd: number;
	nowLocalWzz: number;
	deadAdd: number;
	mtime: string;
	nowConfirm: number;
	localConfirm: number;
	noInfect: number;
	showLocalConfirm: number;
	noInfectH5: number;
	localConfirmH5: number;
	local_acc_confirm: number;
	localWzzAdd: number;
	mediumRiskAreaNum: number;
	mRiskTime: string;
	heal: number;
	suspect: number;
	nowSevere: number;
	importedCase: number;
	localConfirmAdd: number;
	highRiskAreaNum: number;
}

export interface Diseaseh5Shelf {
	chinaAdd: ChinaAdd;
	isShowAdd: boolean;
	showAddSwitch: ShowAddSwitch;
	areaTree: AreaTree[];
	lastUpdateTime: string;
	chinaTotal: ChinaTotal;
}

export interface StatisGradeCityDetail {
	confirm: number;
	grade: string;
	wzz_add: string;
	province: string;
	city: string;
	nowConfirm: number;
	date: string;
	mtime: string;
	sdate: string;
	syear: number;
	confirmAdd: number;
	dead: number;
	heal: number;
}

export interface RootObject {
	diseaseh5Shelf: Diseaseh5Shelf;
	statisGradeCityDetail: StatisGradeCityDetail[];
}