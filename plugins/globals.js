import Vue from 'vue'
import VModal from 'vue-js-modal'
import PageHeader from '@/components/Page/PageHeader';
import SubmitButton from '@/components/Forms/SubmitButton'
import TabList from '@/components/Elements/TabList';
import Validation from '@/components/Forms/Validation'

Vue.use(VModal);
Vue.component('PageHeader', PageHeader);
Vue.component('SubmitButton', SubmitButton);
Vue.component('TabList', TabList);
Vue.component('Validation', Validation);

