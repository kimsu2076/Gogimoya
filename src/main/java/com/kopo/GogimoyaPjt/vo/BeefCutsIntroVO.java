package com.kopo.GogimoyaPjt.vo;

/**
 * BEEFCUTS_INTRO 테이블과 매핑되는 VO 클래스
 * 소고기 부위별 기본 정보를 담습니다.
 */
public class BeefCutsIntroVO {
    private String cutName;         // 부위명 (cut_name)
    private String largeCategory;   // 대분할 (large_category)
    private String description;     // 소개 (description)

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
        return "BeefCutsIntroVO [cutName=" + cutName + ", largeCategory=" + largeCategory + ", description="
                + description + "]";
    }
}
