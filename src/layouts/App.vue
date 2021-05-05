<template>
    <q-layout view="hHh Lpr fFf">
        <q-header elevated>
            <q-toolbar>
                <div class="flex items-end">
                    <q-toolbar-title>ドラちゃんのチートシート</q-toolbar-title>
                    <small>v{{ version }}</small>
                </div>

                <q-space/>

                <div v-if="$q.screen.gt.xs" class="row items-center">
                    <q-tabs stretch>
                        <q-route-tab to="/" label="ホーム"/>
                    </q-tabs>
                    <q-separator vertical class="q-mx-sm q-my-xs"/>
                    <q-btn
                        flat
                        round
                        icon="mdi-github"
                        type="a"
                        :href="homepage"
                        target="_blank"
                    />
                </div>
                <q-btn
                    v-else
                    flat
                    icon="mdi-menu"
                    class="header-menu-btn"
                    @click="isDrawerOpen = !isDrawerOpen"
                />
            </q-toolbar>
        </q-header>

        <q-drawer
            bordered
            overlay
            side="right"
            :breakpoint="0"
            :width="$q.screen.width"
            v-model="isDrawerOpen"
        >
            <div class="fit drawer-content">
                <q-tabs vertical indicator-color="transparent" style="height: auto">
                    <q-route-tab to="/" label="ホーム"/>
                </q-tabs>
                <q-separator class="q-my-md"/>
                <q-btn
                    flat
                    icon="mdi-github"
                    label="GitHub"
                    type="a"
                    :href="homepage"
                    target="_blank"
                    class="full-width"
                />
            </div>
        </q-drawer>

        <q-page-container>
            <router-view/>
        </q-page-container>

        <footer>
            <div class="flex justify-center items-center q-px-sm full-height text-white">
                <small>Copyright &copy; 2021 MT224244</small>
            </div>
        </footer>

        <q-page-sticky position="bottom-right" :offset="[20, 50]">
            <transition name="page-top">
                <q-btn v-show="isScrolled" fab class="page-top">
                    <q-icon size="50px" name="mdi-chevron-up" color="white" @click="btnPageTop_onClick"/>
                </q-btn>
            </transition>
        </q-page-sticky>

        <q-resize-observer @resize="onResize"/>
    </q-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { scroll } from 'quasar';

import { version, homepage } from '@/../package.json';

@Component({
    data: () => ({
        version,
        homepage
    })
})
export default class App extends Vue {
    private isDrawerOpen = false;

    private isScrolled = false;

    public mounted() {
        const body = scroll.getScrollTarget(document.documentElement);
        body.addEventListener('scroll', () => {
            if (scroll.getScrollPosition(body) > 100) {
                this.isScrolled = true;
            }
            else {
                this.isScrolled = false;
            }
        });

        if (scroll.getScrollPosition(body) > 100) {
            this.isScrolled = true;
        }
    }

    private btnPageTop_onClick() {
        scroll.animScrollTo(document.documentElement, 0, 300);
    }

    private onResize() {
        if (this.$q.screen.gt.xs) {
            this.isDrawerOpen = false;
        }
    }
}
</script>

<style lang="scss">
@import '@/styles/quasar.variables.scss';

* {
    font-family: 'Noto Sans JP', sans-serif;
}

a {
    text-decoration: none;
    color: blue;
}

body {
    background-color: #ece6ce;
}
footer {
    height: 30px;
    margin-top: 80px;
    background-color: $primary;
}

.q-page {
    min-height: calc(100vh - 80px) !important;
}
</style>

<style lang="scss" scoped>
.q-toolbar__title {
    display: inline-block;
    flex: unset;
    height: 100%;
    font-family: 'M PLUS Rounded 1c', sans-serif;
    padding-right: 2px;
}
.header-menu-btn {
    width: 50px;
    height: 50px;
}
.q-drawer-container ::v-deep .q-drawer {
    backdrop-filter: blur(5px);
    background-color: rgba(#ece6ce, 0.4);
}
.drawer-content .q-tab {
    &.q-tab--active {
        background-color: rgba(#ffaa5a, 0.3);
    }
}

.page-top {
    background-color: #ffaa5a;
    > ::v-deep .q-btn__wrapper {
        padding: 0;
    }
}
.page-top-enter {
    opacity: 0;
}
.page-top-enter-active {
    transition-property: opacity;
    transition-duration: 200ms;
}
.page-top-leave-active {
    transition-property: opacity;
    transition-duration: 200ms;
}
.page-top-leave-to {
    opacity: 0;
}
</style>
