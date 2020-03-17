<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>Hello Ionic Vue</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
          <ion-button color="primary" @click="presentActionSheet" expand="block">presentActionSheet</ion-button>
      <ion-card>
        <ion-card-header>
          <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
          <ion-card-title>Card Title</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          Keep close to Nature's heart... and break clear away, once in awhile,
          and climb a mountain or spend a week in the woods. Wash your spirit clean.
        </ion-card-content>
      </ion-card>
    </ion-content>
  </div>
</template>

<script>
export default {
  name: 'home',
  methods: {
    presentActionSheet() {
      return this.$ionic.actionSheetController
        .create({
          header: 'Albums',
          buttons: [
            {
              text: 'Delete',
              role: 'destructive',
              icon: 'trash',
              handler: () => {
                console.log('Delete clicked')
              },
            },
            {
              text: 'Share',
              icon: 'share',
              handler: () => {
                console.log('Share clicked')
              },
            },
            {
              text: 'Play (open modal)',
              icon: 'arrow-dropright-circle',
              handler: () => {
                console.log('Play clicked')
              },
            },
            {
              text: 'Favorite',
              icon: 'heart',
              handler: () => {
                console.log('Favorite clicked')
              },
            },
            {
              text: 'Cancel',
              icon: 'close',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked')
              },
            },
          ],
        })
        .then(a => a.present());
    }
  }
}
</script>