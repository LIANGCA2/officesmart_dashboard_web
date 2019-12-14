<template>
  <div class="footer full-width full-height flex primary-bg">
    <div class="content sm-text white-text">Copyright © 2000 - 2019 OfficeSmart Limited (Incorporated in British Virgin Islands with members’ limited liability). All rights reserved.</div>
    <ul class="content legal-lines flex sm-text">
      <li class="legal-line"><a class="white-text" href="#">Terms of Use</a><span class="divider white-text">|</span></li>
      <li class="legal-line"><a class="white-text" href="#">Privacy and Security Statement</a><span class="divider white-text">|</span></li>
      <li class="legal-line"><a class="white-text" href="#">Copyright Infringement Policy</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ApplicationFooter'
}
</script>

<style scoped lang="scss">
  .footer {
    box-sizing: border-box;
    border-top: 1px solid $-line-color-;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    .content {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .legal-lines {
      margin: 0 0 0 12px;
      padding: 0;
      list-style: none;
      flex-shrink: 0;
      .legal-line {
        a {
          outline: none;
          text-decoration: none;
        }
        .divider {
          margin: 0 8px;
        }
      }
    }
  }
</style>
