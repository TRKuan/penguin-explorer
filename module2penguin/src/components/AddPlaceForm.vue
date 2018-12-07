<template lang="html">
  <div class="add-place-form">
    <form>
      <div class="form-group">
        <label for="textarea">Comment</label>
        <textarea class="form-control" id="textarea" rows="3"></textarea>
      </div>
      <div class="custom-file">
        <label class="custom-file-label" for="image-file">Upload an Image</label>
        <input type="file" accept="image/*" class="custom-file-input" id="image-file" @change="onChange($event.target.files)">
      </div>
      <div class="img-div">
        <img v-if="imgUrl" :src="imgUrl">
      </div>
      <div class="submit">
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AddPlaceForm',
  data() {
    return {
      imgUrl: null
    }
  },
  methods: {
    onChange(files) {
      this.imgUrl = URL.createObjectURL(files[0]);
    }
  }
}
</script>

<style lang="css">
.add-place-form {
  margin-top: 2rem;
  display: flex;
  flex-flow: column;
  align-items: center;
  padding-bottom: 2rem;
}
form {
  width: 90%;
}
div.submit {
  margin-top: 1rem;
  text-align: center;
}
.img-div {
  margin: 1rem;
  text-align: center;
}
img {
  max-width: 100%;
}
</style>
