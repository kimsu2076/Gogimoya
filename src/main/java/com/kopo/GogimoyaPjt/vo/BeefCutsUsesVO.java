package com.kopo.GogimoyaPjt.vo;

/**
 * BEEFCUTS_USES 테이블과 매핑되는 VO 클래스
 * 소고기 부위별 용도(요리법) 정보를 담습니다.
 */
public class BeefCutsUsesVO {
    private String cookingMethod;   // 요리법 (cooking_method)
    private String cutName;         // 부위명 (cut_name)

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
