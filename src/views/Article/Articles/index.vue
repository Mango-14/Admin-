<template>
  <el-form
    ref="ArtFormRef"
    :inline="true"
    :model="selectData"
    class="demo-form-inline"
  >
    <el-form-item label="文章标题：" prop="title">
      <el-input v-model="selectData.title" placeholder="请输入文章标题" />
    </el-form-item>
    <el-form-item label="文章类名" prop="cate_id">
      <el-select v-model="selectData.cate_id" placeholder="请选择文章类名">
        <el-option
          :label="cate.name"
          :value="cate.id"
          v-for="cate in cateList"
          :key="cate.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button @click="resetForm(ArtFormRef)">清空</el-button>
    </el-form-item>
  </el-form>
  <hr />
  <br />
  <el-table
    :data="sliceArticlesList[selectData.page - 1]"
    border
    style="width: 100%"
  >
    <el-table-column prop="cover_img" label="封面" width="180">
      <template #default="scope">
        <el-avatar
          shape="square"
          :size="100"
          :src="scope.row.cover_img"
          @click="contentDrawer(scope.row)"
        />
      </template>
    </el-table-column>
    <el-table-column prop="title" label="标题" width="180" />
    <el-table-column prop="state" label="状态" width="180" />
    <el-table-column prop="pub_date" label="提交日期" width="250" />
    <el-table-column prop="cate_id" label="文章分类ID" width="" />
    <el-table-column prop="author_id" label="作者ID" width="" />
  </el-table>
  <el-pagination
    v-model:currentPage="selectData.page"
    v-model:page-size="selectData.page_size"
    layout="prev, pager, next, jumper"
    :total="selectData.count"
  />
  <el-drawer v-model="isShow" :title="currentAtricle.title">
    <div v-html="currentAtricle.content"></div>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted, computed } from "vue";
import { Data } from "@/types/articles";
import type { ArticleInt } from "@/types/articles";
import { useArticleStore } from "@/stores/article";
import { getArticles } from "@/api/module/artcate";
import type { FormInstance } from "element-plus";

const data = reactive(new Data());
const { selectData, sliceArticlesList, isShow, currentAtricle } = toRefs(data);
const article = useArticleStore();
const { cateList } = article;
const ArtFormRef = ref<FormInstance>();

const getArticleList = async () => {
  const result = await getArticles();
  data.articlesList = result.data;
  data.selectData.count = result.data.length;
  sliceList(result.data);
};

onMounted(() => {
  getArticleList();
});

const sliceList = (arr: ArticleInt[]) => {
  data.sliceArticlesList = [];
  for (let index = 0; index < arr.length; index += 6) {
    let list: ArticleInt[] = arr.slice(index, index + 6);
    data.sliceArticlesList.push(list);
  }
};

const onSubmit = () => {
  let arr: ArticleInt[] = [];
  if (data.selectData.title || data.selectData.cate_id) {
    if (data.selectData.title) {
      arr = data.articlesList.filter(
        (item) => item.title.indexOf(data.selectData.title.trim()) != -1
      );
    }
    if (data.selectData.cate_id) {
      arr = (data.selectData.title ? arr : data.articlesList).filter(
        (item) => item.cate_id == data.selectData.cate_id
      );
    }
  } else {
    arr = data.articlesList;
  }
  data.selectData.count = arr.length;
  sliceList(arr);
};

const resetForm = (ArtFormRef: FormInstance | undefined) => {
  if (!ArtFormRef) return;
  ArtFormRef.resetFields();
};

const contentDrawer = (row: any) => {
  data.isShow = true;
  data.currentAtricle = row;
};
</script>

<style lang="less" scoped>
:deep(.el-table__cell) {
  text-align: center;
  font-size: 16px;
}
.el-pagination {
  justify-content: center;
}
</style>
