package com.kopo.GogimoyaPjt.vo;

/**
 * [Progress] BEEFCUTS_USES 테이블과 매핑되는 VO 클래스
 * 요리 용도별 최적의 소고기 부위 매핑 데이터를 관리합니다.
 */
public class BeefCutsUsesVO {
    private String cookingMethod; // 요리법 (용도)
    private String cutName;       // 부위명

    public BeefCutsUsesVO() {}

    public BeefCutsUsesVO(String cookingMethod, String cutName) {
        this.cookingMethod = cookingMethod;
        this.cutName = cutName;
    }

    public String getCookingMethod() {
        return cookingMethod;
    }

    public void setCookingMethod(String cookingMethod) {
        this.cookingMethod = cookingMethod;
    }

    public String getCutName() {
        return cutName;
    }

    public void setCutName(String cutName) {
        this.cutName = cutName;
    }

    @Override
    public String toString() {
        return "BeefCutsUsesVO [cookingMethod=" + cookingMethod + ", cutName=" + cutName + "]";
    }
}
