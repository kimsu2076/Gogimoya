package com.kopo.GogimoyaPjt.mapper;

import java.util.List;
import com.kopo.GogimoyaPjt.vo.BeefCutsIntroVO;

/**
 * 소고기 부위 정보 조회를 위한 MyBatis 매퍼 인터페이스
 */
public interface BeefMapper {
    // 모든 부위 정보 조회
    List<BeefCutsIntroVO> selectAllBeefCuts();
    
    // 특정 부위 상세 정보 조회
    BeefCutsIntroVO selectBeefCutByName(String cutName);
}
