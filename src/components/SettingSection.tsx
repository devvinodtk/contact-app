import { motion } from "framer-motion";

export type SettingsProp = {
  icon: any;
  title: any;
  children: any;
};

function SettingSection({ icon: Icon, title, children }: SettingsProp) {
  return (
    <motion.div
      className="flex flex-col items-center p-6 bg-blue-200 shadow rounded"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-4">
        <Icon className="text-indigo-400 mr-4" size="24" />
        <h2 className="text-xl font-semibold text-black">{title}</h2>
      </div>
      {children}
    </motion.div>
  );
}

export default SettingSection;
