<template>
  <el-form :inline="true" :model="selectData" class="demo-form-inline">
    <el-form-item label="文章类名：">
      <el-input v-model="selectData.name" placeholder="请输入文章类名" />
    </el-form-item>
    <el-form-item label="别名：">
      <el-input v-model="selectData.alias" placeholder="请输入文章别名" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button type="primary" @click="isShow = true">添加文章分类</el-button>
    </el-form-item>
  </el-form>
  <hr />
  <br />
  <el-table :data="artcateList" border style="width: 100%">
    <el-table-column prop="id" label="Id" width="180" />
    <el-table-column prop="name" label="分类名" width="180" />
    <el-table-column prop="alias" label="别名" width="180" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" @click="updateArtcate(scope.row)"
          >更新分类</el-button
        >
        <el-button size="small" type="danger" @click="clickDel(scope.row)"
          >删除分类</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-drawer
    ref="drawerRef"
    v-model="isShow"
    title="请输入相应信息"
    custom-class="demo-drawer"
  >
    <div class="demo-drawer__content">
      <el-form :model="addData">
        <el-form-item label="文章类名" label-width="70px">
          <el-input v-model="addData.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="别名" label-width="70px">
          <el-input v-model="addData.alias" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div class="demo-drawer__footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="addArtcates"> 确认添加</el-button>
      </div>
    </div>
  </el-drawer>
  <el-dialog v-model="updateShow" title="编辑">
    <el-form :model="updateData">
      <el-form-item label="分类名" label-width="70px">
        <el-input
          v-model="updateData.name"
          autocomplete="off"
          placeholder="请输入分类名"
        />
      </el-form-item>
      <el-form-item label="别名" label-width="70px">
        <el-input
          v-model="updateData.alias"
          autocomplete="off"
          placeholder="请输入别名"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="updateShow = false">取消</el-button>
        <el-button type="primary" @click="sureUpdate">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="isDel" title="删除分类" width="30%" center>
    <span>是否确定删除</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isDel = false">取消</el-button>
        <el-button type="danger" @click="delArtcate">确定删除</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, onMounted, toRefs } from "vue";
import { Data } from "@/types/artcate";
import type { ArtcateListInt } from "@/types/artcate";
import { addCates, delCates, updateCates } from "@/api/module/artcate";
import { ElMessage } from "element-plus";
import { useArticleStore } from "@/stores/article";

const data = reactive(new Data());
let {
  selectData,
  artcateList,
  isShow,
  addData,
  updateShow,
  updateData,
  isDel,
} = toRefs(data);
const article = useArticleStore();

const getCatesList = async () => {
  // const result = await getCates();
  await article.setCateList();
  data.artcateList = article.cateList;
  data.searchArtcateList = article.cateList;
};

onMounted(() => {
  getCatesList();
});

const addArtcates = async () => {
  const result: any = await addCates(data.addData);
  data.isShow = false;
  getCatesList();
  ElMessage.success(result.message);
};

const clickDel = (row: ArtcateListInt) => {
  data.isDel = true;
  data.delId = row.id;
};

const delArtcate = async () => {
  const result: any = await delCates(data.delId);
  data.isDel = false;
  getCatesList();
  ElMessage.success(result.message);
};

const updateArtcate = (row: ArtcateListInt) => {
  data.updateData = {
    id: row.id,
    name: row.name,
    alias: row.alias,
    is_delete: row.is_delete,
  };
  data.updateShow = true;
};

const sureUpdate = async () => {
  const result: any = await updateCates(data.updateData);
  data.updateShow = false;
  getCatesList();
  ElMessage.success(result.message);
};

const onSubmit = () => {
  let arr: ArtcateListInt[] = [];
  if (data.selectData.name || data.selectData.alias) {
    if (data.selectData.name) {
      arr = data.searchArtcateList.filter(
        (item: ArtcateListInt) =>
          item.name.indexOf(data.selectData.name.trim()) != -1
      );
    }
    if (data.selectData.alias) {
      arr = (data.selectData.name ? arr : data.searchArtcateList).filter(
        (item: ArtcateListInt) =>
          item.alias.indexOf(data.selectData.alias.trim()) != -1
      );
    }
  } else {
    arr = data.searchArtcateList;
  }
  data.artcateList = arr;
};
</script>

<style lang="less">
.el-pagination {
  justify-content: center;
}
</style>
