import pandas as pd
from sqlalchemy import create_engine

# 1. 엑셀 파일 경로 설정
base_path = r"C:\Users\SMT14\Documents\workspace-sts-3.9.18.RELEASE\GogimoyaPjt\Data\\"

file_intro = base_path + "BEEFCUTS_INTRO.xlsx"
file_names = base_path + "BEEFCUTS_NAMES.xlsx"
file_uses = base_path + "BEEFCUTS_USES.xlsx"

# 2. MySQL 데이터베이스 연결 설정
# 구조: mysql+pymysql://유저아이디:비밀번호@호스트:포트/데이터베이스이름
engine = create_engine("mysql+pymysql://kopouser:kopouser@localhost:3306/gogimoya_db")

print("=== 🥩 고기모야 데이터 파이프라인 가동 시작 ===")

# --- [변환 1] BEEFCUTS_INTRO (기본 정보) ---
df_intro = pd.read_excel(file_intro)
# 컬럼명 매칭 (부위명 -> cut_name, 대분할 -> large_category, 소개 -> description)
df_intro.columns = ['cut_name', 'large_category', 'description']
df_intro.to_sql(name='BEEFCUTS_INTRO', con=engine, if_exists='replace', index=False)
print("1. BEEFCUTS_INTRO 적재 완료!")


# --- [변환 2] BEEFCUTS_NAMES (★핵심: 가로 국가 명칭을 세로로 녹이기) ---
df_names = pd.read_excel(file_names)

# '한국' 컬럼을 기준(정석명)으로 잡고, 나머지 국가 컬럼들을 세로행으로 녹여냅니다(pd.melt)
df_names_melted = df_names.melt(id_vars=['한국'], var_name='country', value_name='local_name')
df_names_melted.columns = ['standard_name', 'country', 'local_name']

# 빈 칸(결측치) 제거하기
df_names_melted = df_names_melted.dropna(subset=['local_name'])

df_names_melted.to_sql(name='BEEFCUTS_NAMES', con=engine, if_exists='replace', index=False)
print("2. BEEFCUTS_NAMES 다국어 매핑 데이터 적재 완료")


# --- [변환 3] BEEFCUTS_USES (용도별 데이터 녹이기) ---
df_uses = pd.read_excel(file_uses)

# 각 요리 용도(가로 컬럼)를 세로로 녹여서 요리법-부위 쌍으로 만듭니다.
df_uses_melted = df_uses.melt(var_name='cooking_method', value_name='cut_name')
df_uses_melted = df_uses_melted.dropna(subset=['cut_name'])

df_uses_melted.to_sql(name='BEEFCUTS_USES', con=engine, if_exists='replace', index=False)
print("3. BEEFCUTS_USES 용도별 데이터 적재 완료!")

print("=== 🎉 모든 데이터가 SQL 데이터베이스에 성공적으로 안착했습니다. ===")