import { useAdminConfigApi } from "@/services/systems/adminConfig";
import type { ConfigItem } from "@/types/Config/config";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
// import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { toast } from "sonner"; // hoặc bạn có thể dùng react-toastify

const AdminConfig = () => {
  const [configs, setConfigs] = useState<ConfigItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const { getAllConfigs, saveConfigs } = useAdminConfigApi();

  useEffect(() => {
    getAllConfigs().then((data) => {
      setConfigs(data);
      setLoading(false);
    });
  }, []);

  const handleChange = (
    index: number,
    field: keyof ConfigItem,
    value: string | boolean
  ) => {
    setConfigs((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveConfigs(configs);
      toast.success("Configuration saved successfully!");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Failed to save configuration.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-4">Loading configs...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">System Configuration</h2>

      <div className="mb-4">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full text-sm table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Key</th>
              <th className="px-4 py-2 text-left">Value</th>
              <th className="px-4 py-2 text-left">Type</th>
              {/* <th className="px-4 py-2 text-center">Secret</th>
              <th className="px-4 py-2 text-center">Client Exposed</th> */}
              <th className="px-4 py-2 text-left">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {configs.map((item, index) => (
              <tr key={item.key} className="border-t">
                <td className="px-4 py-2 font-mono">{item.key}</td>

                <td className="px-4 py-2">
                  <Input
                    value={item.value}
                    onChange={(e: { target: { value: string | boolean; }; }) =>
                      handleChange(index, "value", e.target.value)
                    }
                    className="w-full"
                  />
                </td>

                <td className="px-4 py-2">{item.type}</td>

                {/* <td className="px-4 py-2 text-center">
                  <Switch
                    checked={item.isSecret}
                    onCheckedChange={(val) =>
                      handleChange(index, "isSecret", val)
                    }
                  />
                </td> */}

                {/* <td className="px-4 py-2 text-center">
                  <Switch
                    checked={item.isClientExposed}
                    onCheckedChange={(val) =>
                      handleChange(index, "isClientExposed", val)
                    }
                  />
                </td> */}

                <td className="px-4 py-2 text-sm text-gray-600">
                  {new Date(item.updatedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminConfig;
