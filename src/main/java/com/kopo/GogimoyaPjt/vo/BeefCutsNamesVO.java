package com.kopo.GogimoyaPjt.vo;

/**
 * [Progress] BEEFCUTS_NAMES 테이블과 매핑되는 VO 클래스
 * 한국 기준 부위명에 대응하는 국가별 현지 명칭 데이터를 관리합니다.
 */
public class BeefCutsNamesVO {
    private String standardName; // 한국 기준 정석 부위명
    private String country;      // 국가명
    private String localName;    // 현지 명칭

    public BeefCutsNamesVO() {}

    public BeefCutsNamesVO(String standardName, String country, String localName) {
        this.standardName = standardName;
        this.country = country;
        this.localName = localName;
    }

    public String getStandardName() {
        return standardName;
    }

    public void setStandardName(String standardName) {
        this.standardName = standardName;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getLocalName() {
        return localName;
    }

    public void setLocalName(String localName) {
        this.localName = localName;
    }

    @Override
    public String toString() {
        return "BeefCutsNamesVO [standardName=" + standardName + ", country=" + country + ", localName=" + localName + "]";
    }
}
