package com.kopo.GogimoyaPjt.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.kopo.GogimoyaPjt.mapper.BeefMapper;
import com.kopo.GogimoyaPjt.vo.BeefCutsIntroVO;

@Service
public class BeefServiceImpl implements BeefService {

    @Autowired
    private BeefMapper beefMapper;

    @Override
    public List<BeefCutsIntroVO> getAllBeefCuts() {
        return beefMapper.selectAllBeefCuts();
    }
}
