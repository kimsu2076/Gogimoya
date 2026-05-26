<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>고기모야 (Gogimoya) - 소고기 부위 정보</title>
<style>
    body { font-family: 'Malgun Gothic', sans-serif; padding: 20px; background-color: #f4f4f4; }
    h1 { color: #d32f2f; text-align: center; }
    .container { max-width: 1000px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
    th { background-color: #d32f2f; color: white; }
    tr:nth-child(even) { background-color: #f9f9f9; }
    .category-badge { background: #795548; color: white; padding: 3px 8px; border-radius: 4px; font-size: 0.8em; }
</style>
</head>
<body>

<div class="container">
    <h1>🥩 고기모야 (Gogimoya) - 소고기 부위 도감</h1>
    <p style="text-align: center; color: #666;">데이터베이스에 저장된 소고기 부위별 대분할 및 상세 설명을 확인하세요.</p>

    <table>
        <thead>
            <tr>
                <th style="width: 20%;">부위명</th>
                <th style="width: 15%;">대분할</th>
                <th>상세 설명</th>
            </tr>
        </thead>
        <tbody>
            <c:forEach var="beef" items="${beefList}">
                <tr>
                    <td><strong>${beef.cutName}</strong></td>
                    <td><span class="category-badge">${beef.largeCategory}</span></td>
                    <td>${beef.description}</td>
                </tr>
            </c:forEach>
            <c:if test="${empty beefList}">
                <tr>
                    <td colspan="3" style="text-align: center; padding: 50px;">
                        데이터가 존재하지 않습니다. <br>
                        (DB에 BEEFCUTS_INTRO 테이블 데이터가 적재되어 있는지 확인해주세요.)
                    </td>
                </tr>
            </c:if>
        </tbody>
    </table>
</div>

</body>
</html>
