package com.kopo.GogimoyaPjt.vo;

/**
 * [Progress] BEEFCUTS_INTRO 테이블과 매핑되는 VO 클래스
 * 소고기 부위별 기본 마스터 데이터를 관리합니다.
 */
public class BeefCutsIntroVO {
    private String cutName;        // 부위명
    private String largeCategory;  // 대분할 카테고리
    private String description;    // 해부학적 특징 및 육질 소개 정보

    public BeefCutsIntroVO() {}

    public BeefCutsIntroVO(String cutName, String largeCategory, String description) {
        this.cutName = cutName;
        this.largeCategory = largeCategory;
        this.description = description;
    }

    public String getCutName() {
        return cutName;
    }

    public void setCutName(String cutName) {
        this.cutName = cutName;
    }

    public String getLargeCategory() {
        return largeCategory;
    }

    public void setLargeCategory(String largeCategory) {
        this.largeCategory = largeCategory;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "BeefCutsIntroVO [cutName=" + cutName + ", largeCategory=" + largeCategory + ", description=" + description + "]";
    }
}
