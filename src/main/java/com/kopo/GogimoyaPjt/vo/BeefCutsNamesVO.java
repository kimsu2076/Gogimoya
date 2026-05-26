package com.kopo.GogimoyaPjt.vo;

/**
 * BEEFCUTS_NAMES 테이블과 매핑되는 VO 클래스
 * 소고기 부위별 다국어 명칭 매핑 정보를 담습니다.
 */
public class BeefCutsNamesVO {
    private String standardName;    // 정석명 (standard_name - 한국어 기준)
    private String country;         // 국가 (country)
    private String localName;       // 현지 명칭 (local_name)

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
        return "BeefCutsNamesVO [standardName=" + standardName + ", country=" + country + ", localName=" + localName
                + "]";
    }
}
