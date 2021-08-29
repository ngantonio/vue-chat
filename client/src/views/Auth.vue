<template>
  <div class="container">
    <div class="met align-middle" center>
      
        <b-row class="justify-content-center">
          <b-col md="12">
            <b-form>
              <h2 class="text-center mb-4">¡Welcome!</h2>
              <b-input-group prepend="@" class="mb-2 mr-sm-2 mb-sm-0">
                  <b-form-input id="inline-form-input-username" placeholder="Type a username ... "></b-form-input>
              </b-input-group>
            </b-form>

            <div class="text-right">
              <b-button block class="mt-4" variant="success" pill >start chatting</b-button>
            </div>
          </b-col>
        </b-row>
     </div>
  </div>
</template>

<script>
export default {
  name: 'Auth'
};
</script>

<style lang="css" scoped>

.container, .met{
  height: 100%;
}
.met {
  display: flex;
  align-items: center;
}


</style>

